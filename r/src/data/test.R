library(dplyr)


project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"
source(paste0(project_path, "/src/variables.R"))
source(paste0(project_path, "/src/data/functions.R"))

DATA.deceased_today <- get_data_for_date(DATA.cases, today, "Deceased")
DATA.today <- get_data_for_date(DATA.cases, today, "Total_reported")
colnames(DATA.today)[2] <- 'Total_reported_today'
DATA.thisweek <- get_range(DATA.cases, today, 0, 6, "Total_reported", "Total_reported_this_week")
DATA.previousweek <- get_range(DATA.cases, today, 7, 13, "Total_reported", "Total_reported_last_week")
DATA.ready <- merge_data(DATA.municipalities, DATA.today, DATA.thisweek, DATA.previousweek, DATA.deceased_today)