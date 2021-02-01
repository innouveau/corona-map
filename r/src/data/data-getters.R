library(dplyr)
library(plyr)

get_data_for_date <- function(data, date, col_name) {
  date_string <- format(date, "%Y-%m-%d")
  data_filtered <- data %>% filter(Date_of_publication == date)
  df <- data_filtered[,c("Municipality_code", col_name)]
  # sum double entries (Amsterdam)
  df_agg <- aggregate(df[col_name], by = df["Municipality_code"], sum)
  return(df_agg)
}

get_range <- function(data, date, start, end, col_name, new_name) {
  df1 <- get_data_for_date(data, date, col_name)
  for(i in seq((start + 1), end, 1)) {
    this_date <- date - i
    df2 <- get_data_for_date(data, this_date, col_name)
    
    res <- aggregate(cbind(Total_reported) ~ Municipality_code, rbind(df1,df2), sum)
    df1 <- res
  }
  colnames(df1)[2] <- new_name
  return(df1)
}

merge_data <- function(municipalities, data_today, data_thisweek, data_previousweek, data_deceased_today) {
  # join the data
  data_ready <- municipalities %>%
    left_join(data_today, by=c("Municipality_code")) %>%
    left_join(data_thisweek, by=c("Municipality_code")) %>%
    left_join(data_previousweek, by=c("Municipality_code")) %>%
    left_join(data_deceased_today, by=c("Municipality_code"))
  
  # get totals for 'Nederland' (row 1)
  data_ready$population[1] <- sum(data_ready$population, na.rm = T)
  data_ready$Total_reported_today[1] <- sum(data_ready$Total_reported_today, na.rm = T)
  data_ready$Total_reported_this_week[1] <- sum(data_ready$Total_reported_this_week, na.rm = T)
  data_ready$Total_reported_last_week[1] <- sum(data_ready$Total_reported_last_week, na.rm = T)
  data_ready$Deceased[1] <- sum(data_ready$Deceased, na.rm = T)
  
  # make number relative to population
  data_ready$Total_reported_today_relative <- round(100000 * data_ready$Total_reported_today /data_ready$population)
  data_ready$Total_reported_this_week_relative <- round(100000 * data_ready$Total_reported_this_week /data_ready$population)
  data_ready$Total_reported_last_week_relative <- round(100000 * data_ready$Total_reported_last_week /data_ready$population)
  
  # prepare for labels
  # 0 infections = step 0
  # 0 - 16 infections = power_of_2
  # 16 - 512 infections = power_of_2 minus 3 (to fill the gap between 0 en 2^4)
  # > 512 infections = step 6 (power_of_2 for 512 minus 3)
  data_ready$power_of_2 <- ifelse(
    data_ready$Total_reported_this_week_relative > 0, 
    ifelse(
      data_ready$Total_reported_this_week_relative > 16,
      ifelse(
        data_ready$Total_reported_this_week_relative > 512,
        6,
        (log(data_ready$Total_reported_this_week_relative) / log(2)) - 3
      ),
      log(data_ready$Total_reported_this_week_relative) / log(2)
    ),
    0
  )
  data_ready$change <- ifelse(
    data_ready$Total_reported_last_week_relative == 0,
    ifelse(
      data_ready$Total_reported_this_week_relative == 0,
      0, # 0 vs 0 handle as equal
      1 # from 0 to 1: handle as max growth
    ),
    (data_ready$Total_reported_this_week_relative - data_ready$Total_reported_last_week_relative) / data_ready$Total_reported_last_week_relative
  )
    
    
  data_ready$change_scale <- ifelse(
    data_ready$change < 0,
    ifelse(
      data_ready$change < -0.5,
      -1,
      2 * data_ready$change
    ),
    ifelse(
      data_ready$change > 1,
      1,
      data_ready$change
    )
  )
  
    
  # needed for joining with geo data
  colnames(data_ready)[1] <- "statcode"
  return(data_ready)
}

get_daily_reported_exact <- function(data) {
  return (data$Total_reported_today[1])
}

get_daily_reported_rounded <- function(data) {
   return (100 * floor(data$Total_reported_today[1] / 100))
}

get_daily_deceased <- function(data) {
  return (data$Deceased[1])
}

get_infection_rate <- function(data) {
  return (data$Total_reported_this_week_relative[1])
}

get_change <- function(data) {
  return (round(100 * data$change[1]))
}

get_change_highest <- function(data) {
  entry <- data[which.max(data$change),]
  return (entry$Municipality_name)
}

get_change_lowest <- function(data) {
  entry <- data[which.min(data$change),]
  return (entry$Municipality_name)
}