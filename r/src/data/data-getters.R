get_regions_calculated <- function(region_type, col_name_for_join) {
  regions_list <- read.csv(paste0(project_path, "/data/regions/", region_type, ".csv"))
  regions_pivoted <- pivot_regions_list(regions_list, pivot_total, col_name_for_join)
  regions_calculated <- add_calculations(regions_pivoted)
  return (regions_calculated)
  
}

get_regions_with_geo <- function(region_type, regions_calculated) {
  regions_geo <- geojson_read(paste0(project_path, "/data/geo/", region_type, ".geojson"),  what = "sp")
  regions_geo_joined <- join_regions_with_geo(regions_calculated, regions_geo)
  return(regions_geo_joined)
}

get_pivot <- function() {
  pivot_regions <- read.csv(paste0(project_path, "/data/regions/pivot-regions.csv"))
  pivot_cases_today <- get_data_for_date(data_rivm, today, "Total_reported", "cases_today")
  pivot_cases_this_week <- get_range(data_rivm, today, 0, 6, "Total_reported", "cases_this_week")
  pivot_cases_previous_week <- get_range(data_rivm, today, 7, 13, "Total_reported", "cases_previous_week")
  pivot_deceased_today <- get_data_for_date(data_rivm, today, "Deceased", "deceased_today")
  pivot_total <- merge_data(pivot_regions, pivot_cases_today, pivot_cases_this_week, pivot_cases_previous_week, pivot_deceased_today)
  return(pivot_total)
}

get_data_for_date <- function(data, date, col_name, rename_col) {
  date_string <- format(date, "%Y-%m-%d")
  data_filtered <- data %>% filter(Date_of_publication == date)
  df <- data_filtered[,c("Municipality_code", col_name)]
  # sum double entries (Amsterdam)
  df_agg <- aggregate(df[col_name], by = df["Municipality_code"], sum)
  if (nchar(rename_col) > 0) {
    colnames(df_agg)[2] <- rename_col
  }
  return(df_agg)
}

get_range <- function(data, date, start, end, col_name, rename_col) {
  df1 <- get_data_for_date(data, date, col_name, "")
  for(i in seq((start + 1), end, 1)) {
    this_date <- date - i
    df2 <- get_data_for_date(data, this_date, col_name, "")
    res <- aggregate(cbind(Total_reported) ~ Municipality_code, rbind(df1,df2), sum)
    df1 <- res
  }
  colnames(df1)[2] <- rename_col
  return(df1)
}

pivot_regions_list <- function(list, pivot, col_name_for_join) {

  
  df_aggregated <- pivot %>% 
    group_by_at(col_name_for_join) %>% 
    summarise(
        population = sum(population),
        cases_today = sum(cases_today),
        cases_this_week = sum(cases_this_week),
        cases_previous_week = sum(cases_previous_week),
        deceased_today = sum(deceased_today)
    )
  data <- list %>%
    left_join(df_aggregated, by=c(col_name_for_join))
  return (data)
}

merge_data <- function(regions_list, cases_today, cases_this_week, cases_previous_week, deceased_today) {
  # join the data
  data <- regions_list %>%
    left_join(cases_today, by=c("Municipality_code")) %>%
    left_join(cases_this_week, by=c("Municipality_code")) %>%
    left_join(cases_previous_week, by=c("Municipality_code")) %>%
    left_join(deceased_today, by=c("Municipality_code"))
  
  # get totals for 'Nederland' (row 1)
  data$population[1] <- sum(data$population, na.rm = T)
  data$cases_today[1] <- sum(data$cases_today, na.rm = T)
  data$cases_this_week[1] <- sum(data$cases_this_week, na.rm = T)
  data$cases_previous_week[1] <- sum(data$cases_previous_week, na.rm = T)
  data$deceased_today[1] <- sum(data$deceased_today, na.rm = T)
  return (data);
}

add_calculations <- function(original_data) {
  data <- original_data
  # make number relative to population
  data$cases_today_relative <- round(100000 * data$cases_today /data$population)
  data$cases_this_week_relative <- round(100000 * data$cases_this_week /data$population)
  data$cases_previous_week_relative <- round(100000 * data$cases_previous_week /data$population)
  
  # prepare for labels
  # 0 infections = step 0
  # 0 - 16 infections = power_of_2
  # 16 - 512 infections = power_of_2 minus 3 (to fill the gap between 0 en 2^4)
  # > 512 infections = step 6 (power_of_2 for 512 minus 3)
  data$power_of_2 <- ifelse(
    data$cases_this_week_relative > 0, 
    ifelse(
      data$cases_this_week_relative > 16,
      ifelse(
        data$cases_this_week_relative > 512,
        6,
        (log(data$cases_this_week_relative) / log(2)) - 3
      ),
      log(data$cases_this_week_relative) / log(2)
    ),
    0
  )
  data$change <- ifelse(
    data$cases_previous_week_relative == 0,
    ifelse(
      data$cases_this_week_relative == 0,
      0, # 0 vs 0 handle as equal
      1 # from 0 to 1: handle as max growth
    ),
    (data$cases_this_week_relative - data$cases_previous_week_relative) / data$cases_previous_week_relative
  )
  
  
  data$change_scale <- ifelse(
    data$change < 0,
    ifelse(
      data$change < -0.5,
      -1,
      2 * data$change
    ),
    ifelse(
      data$change > 1,
      1,
      data$change
    )
  )
  
  
  # needed for joining with geo data
  colnames(data)[1] <- "statcode"
  return(data)
}

join_regions_with_geo <- function(regions, geo) {
  # join geo data with test data
  geo@data <- geo@data %>%
    left_join(regions, by=c("statcode"))
  regions_geo_merged <- merge(fortify(geo, region = "id"), geo@data, by = "id")
  # todo find a way to put nice title in legend, instead as via a col name
  colnames(regions_geo_merged)[ncol(regions_geo_merged) -2] <- "Positieve tests per 100.000 inw. per 7 dagen"
  colnames(regions_geo_merged)[ncol(regions_geo_merged)] <- "Groei / Krimp"
  return(regions_geo_merged)
  
}

get_daily_reported_exact <- function() {
  return (pivot_total_calculated$cases_today[1])
}

get_daily_reported_rounded <- function() {
   return (100 * floor(pivot_total_calculated$cases_today[1] / 100))
}

get_daily_deceased <- function() {
  return (pivot_total_calculated$deceased_today[1])
}

get_infection_rate <- function() {
  return (pivot_total_calculated$cases_this_week_relative[1])
}

get_change_netherlands <- function() {
  return (round(100 * pivot_total_calculated$change[1]))
}

get_change_highest <- function(data) {
  regions <- filter_regions_for_population(data)
  entry <- regions[which.max(regions$change),]
  print(entry)
  if (entry$change > 0) {
    return (paste0(entry$title, " ", change_to_string(entry$change)))
  } else {
    # no region had growth
    return ("-")
  }
  
}

get_change_lowest <- function(data) {
  regions <- filter_regions_for_population(data)
  entry <- regions[which.min(regions$change),]
  if (entry$change < 0) {
    return (paste0(entry$title, " ", change_to_string(entry$change)))
  } else {
    return ("-")
  }
}

filter_regions_for_population <- function(data) {
  filtered <- data %>% filter(population > 10000)
  return (filtered)
}

change_to_string <- function(change) {
  pct <- round(100 * change)
  if (change > 0) {
    text <- paste0("+", pct, "%")
  } else {
    text <- paste0("-", abs(pct), "%")
  }
  return (text)
}