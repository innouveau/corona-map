library(jsonlite)
library(geojsonio)
library(sp)
library(ggplot2)
library(broom)
library(sysfonts)
library(showtext)
library(dplyr)
library(rtweet)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"

source(paste0(project_path, "/src/variables.R"))
source(paste0(project_path, "/src/environment.R"))
source(paste0(project_path, "/src/fonts.R"))
source(paste0(project_path, "/src/data/data-getters.R"))
source(paste0(project_path, "/src/map/plot-variables.R"))
source(paste0(project_path, "/src/map/plot.R"))
source(paste0(project_path, "/src/texts/text-getters.R"))
source(paste0(project_path, "/src/twitter/functions.R"))
source(paste0(project_path, "/src/twitter/credentials.R"))
source(paste0(project_path, "/src/twitter/tweets/tweet-1.R"))
source(paste0(project_path, "/src/twitter/tweets/tweet-2.R"))
source(paste0(project_path, "/src/twitter/tweets/tweet-3.R"))

# settings
MODUS.tweet = F
MODUS.download = F

# init
if (MODUS.download ) {
  data_rivm <- read.csv("https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.csv", sep=";") %>% filter(!Municipality_code == "")
} else {
  data_rivm <- read.csv(paste0(project_path, "/data/test-data/COVID-19_aantallen_gemeente_per_dag.csv"), sep=";") %>% filter(!Municipality_code == "")
}
today <- as.Date(last(data_rivm$Date_of_publication))

# regions
municipalities_list <- read.csv(paste0(project_path, "/data/regions/municipalities.csv"))
municipalities_geo <- geojson_read(paste0(project_path, "/data/maps/municipalities.geojson"),  what = "sp")

# pick data from source
municipalities_cases_today <- get_data_for_date(data_rivm, today, "Total_reported", "cases_today")
municipalities_cases_this_week <- get_range(data_rivm, today, 0, 6, "Total_reported", "cases_this_week")
municipalities_cases_previous_week <- get_range(data_rivm, today, 7, 13, "Total_reported", "cases_previous_week")
municipalities_deceased_today <- get_data_for_date(data_rivm, today, "Deceased", "deceased_today")
municipalities_total <- merge_data(municipalities_list, municipalities_cases_today, municipalities_cases_this_week, municipalities_cases_previous_week, municipalities_deceased_today)

# geo

# join geo data with test data
municipalities_geo@data <- municipalities_geo@data %>%
  left_join(municipalities_total,by=c("statcode"))
municipalities_geo_merged <- merge(fortify(municipalities_geo, region = "id"), municipalities_geo@data, by = "id")
# todo find a way to put nice title in legend, instead as via a col name 
colnames(municipalities_geo_merged)[ncol(municipalities_geo_merged) -2] <- "Positieve tests per 100.000 inw. per 7 dagen"
colnames(municipalities_geo_merged)[ncol(municipalities_geo_merged)] <- "Groei / Krimp"

main_settings <- list(
  type = "main",
  filename = "main",
  title = "Corona status",
  subtitle = format(today, "%A %d %B")
)

change_settings <- list(
  type = "change",
  filename = "change",
  title = "Groei/Krimp",
  subtitle = format(today, "%A %d %B")
)

plot_map(municipalities_geo_merged, main_settings)
# plot_map(municipalities_geo_merged, change_settings)

if (MODUS.tweet) {
  post_tweet(
    status = get_tweet_1(),
    media = paste0(project_path, "/plots/main.png")
  )

  post_tweet(
    status = get_tweet_2(),
    in_reply_to_status_id = get_last_tweet_id(),
    media = paste0(project_path, "/plots/change.png")
  )
}
