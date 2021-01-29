library(dplyr)
library(plyr)

get_data_for_date <- function(data, date) {
  date_string <- format(date, "%Y-%m-%d")
  data_filtered <- data %>% filter(Date_of_publication == date)
  # todo: later use Hospital_admission and Deceased as well
  # data.stripped <- data.filtered[,c("Municipality_code","Total_reported", "Hospital_admission", "Deceased")]
  df <- data_filtered[,c("Municipality_code","Total_reported")]
  # sum double entries (Amsterdam)
  df_agg <- aggregate(df["Total_reported"], by = df["Municipality_code"], sum)
  return(df_agg)
}

get_range <- function(data, date, start, end, new_name) {
  df1 <- get_data_for_date(data, date)
  for(i in seq((start + 1), end, 1)) {
    this_date <- date - i
    df2 <- get_data_for_date(data, this_date)
    
    res <- aggregate(cbind(Total_reported) ~ Municipality_code, rbind(df1,df2), sum)
    df1 <- res
  }
  colnames(df1)[2] <- new_name
  return(df1)
}

merge_data <- function(municipalities, data_today, data_thisweek, data_previousweek) {
  # join the data
  data_ready <- municipalities %>%
    left_join(data_today, by=c("Municipality_code")) %>%
    left_join(data_thisweek, by=c("Municipality_code")) %>%
    left_join(data_previousweek, by=c("Municipality_code"))
  
  # make number relative to population
  data_ready$Total_reported_today_relative = round(100000 * data_ready$Total_reported_today /data_ready$population)
  data_ready$Total_reported_this_week_relative = round(100000 * data_ready$Total_reported_this_week /data_ready$population)
  data_ready$Total_reported_last_week_relative = round(100000 * data_ready$Total_reported_last_week /data_ready$population)
  
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
  
  # needed for joining with geo data
  colnames(data_ready)[1] <- "statcode"
  return(data_ready)
}