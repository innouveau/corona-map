library(dplyr)
library(plyr)

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

get_daily_reported_exact <- function() {
  return (pivot_total$cases_today[1])
}

get_daily_reported_rounded <- function() {
   return (100 * floor(pivot_total$cases_today[1] / 100))
}

get_daily_deceased <- function() {
  return (pivot_total$deceased_today[1])
}

get_infection_rate <- function() {
  return (pivot_total$cases_this_week_relative[1])
}

get_change <- function() {
  return (round(100 * pivot_total$change[1]))
}

get_change_highest <- function() {
  entry <- pivot_total[which.max(pivot_total$change),]
  return (entry$Municipality_name)
}

get_change_lowest <- function() {
  entry <- pivot_total[which.min(pivot_total$change),]
  return (entry$Municipality_name)
}