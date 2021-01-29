library(dplyr)


project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"
source(paste0(project_path, "/src/variables.R"))
source(paste0(project_path, "/src/data/functions.R"))


DATA.today <- get_data_for_date(DATA.cases, today)
DATA.thisweek <- get_range(DATA.cases, today, 0, 6, 'Total_reported_this_week')