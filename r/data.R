library(dplyr)
library


project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"
DATA.municipalities <- read.csv(paste0(project_path, "/data/municipalities.csv"))
DATA.cases <- read.csv(paste0(project_path, "/data/COVID-19_aantallen_gemeente_per_dag.csv"), sep=";")

today <- as.Date(last(DATA.cases$Date_of_publication))



get_data_for_date <- function(data, date) {
  date_string <- format(date, "%Y-%m-%d")
  data.filtered <- data %>% filter(Date_of_publication == date)
  # todo: later use Hospital_admission and Deceased as well
  # data.stripped <- data.filtered[,c("Municipality_code","Total_reported", "Hospital_admission", "Deceased")]
  data.stripped <- data.filtered[,c("Municipality_code","Total_reported")]
  return(data.stripped)
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


DATA.today <- get_data_for_date(DATA.cases, today)
colnames(DATA.today)[2] <- 'Total_reported_today'

DATA.thisweek <- get_range(DATA.cases, today, 0, 6, 'Total_reported_this_week')
DATA.previousweek <- get_range(DATA.cases, today, 7, 13, 'Total_reported_last_week')




DATA.joined <- DATA.municipalities %>%
  left_join(DATA.today, by=c("Municipality_code")) %>%
  left_join(DATA.thisweek, by=c("Municipality_code")) %>%
  left_join(DATA.previousweek, by=c("Municipality_code"))
