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
MODUS.download = T

# init
if (MODUS.download ) {
  data_rivm <- read.csv("https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.csv", sep=";") %>% filter(!Municipality_code == "")
} else {
  data_rivm <- read.csv(paste0(project_path, "/data/test-data/COVID-19_aantallen_gemeente_per_dag.csv"), sep=";") %>% filter(!Municipality_code == "")
}
today <- as.Date(last(data_rivm$Date_of_publication))


pivot_total <- get_pivot()
pivot_total_calculated <- add_calculations(pivot_total)

safety_regions <- get_regions("safety-regions", "safetyRegion_code")
ggds <- get_regions("ggds", "ggd_code")
municipalities <- get_regions("municipalities", "Municipality_code")


plot_map(municipalities, get_plot_settings("main", "municipalities"))
plot_map(municipalities, get_plot_settings("change", "municipalities"))
plot_map(safety_regions, get_plot_settings("main", "safety-regions"))
plot_map(safety_regions, get_plot_settings("change", "safety-regions"))
plot_map(ggds, get_plot_settings("main", "ggds"))
plot_map(ggds, get_plot_settings("change", "ggds"))


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