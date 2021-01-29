library(jsonlite)
library(geojsonio)
library(sp)
library(ggplot2)
library(broom)
library(sysfonts)
library(showtext)
library(dplyr)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"


source(paste0(project_path, "/src/variables.R"))
source(paste0(project_path, "/src/environment.R"))
source(paste0(project_path, "/src/fonts.R"))
source(paste0(project_path, "/src/data/functions.R"))
source(paste0(project_path, "/src/map/plot.R"))

# pick data (today, thisweek and previousweek) from source
DATA.today <- get_data_for_date(DATA.cases, today)
colnames(DATA.today)[2] <- 'Total_reported_today'
DATA.thisweek <- get_range(DATA.cases, today, 0, 6, 'Total_reported_this_week')
DATA.previousweek <- get_range(DATA.cases, today, 7, 13, 'Total_reported_last_week')
DATA.ready <- merge_data(DATA.municipalities, DATA.today, DATA.thisweek, DATA.previousweek)



# prepair data for plotting
MUNICIPALITIES.geo <- geojson_read(MUNICIPALITIES.geo.url,  what = "sp")
# join geo data with test data
MUNICIPALITIES.geo@data <- MUNICIPALITIES.geo@data %>%
  left_join(DATA.ready,by=c("statcode"))
DATA.fortified <- fortify(MUNICIPALITIES.geo, region = "id")
DATA.merged <- merge(DATA.fortified, MUNICIPALITIES.geo@data, by = "id")

plot_map(DATA.merged)
