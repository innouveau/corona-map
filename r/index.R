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
source(paste0(project_path, "/src/poller/poller.R"))
source(paste0(project_path, "/src/data/data-getters.R"))
source(paste0(project_path, "/src/map/plot-variables.R"))
source(paste0(project_path, "/src/map/plot.R"))
source(paste0(project_path, "/src/texts/text-getters.R"))
source(paste0(project_path, "/src/twitter/functions.R"))
source(paste0(project_path, "/src/twitter/credentials.R"))
source(paste0(project_path, "/src/twitter/tweets/tweets.R"))


# settings
MODUS.tweet = F

# today = as.Date("2021-02-08")
today = Sys.Date()
data_rivm <- poll("https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.csv", today)


pivot_total <- get_pivot()
pivot_total_calculated <- add_calculations(pivot_total)


municipalities_calculated <- get_regions_calculated("municipalities", "Municipality_code")
municipalities_geo <- get_regions_with_geo("municipalities", municipalities_calculated)
safety_regions_calculated <- get_regions_calculated("safety-regions", "safetyRegion_code")
safety_regions_geo <- get_regions_with_geo("safety-regions", safety_regions_calculated)
# ggds_calculated <- get_regions_calculated("ggds", "ggd_code")
# ggds_geo <- get_regions_with_geo("ggds", ggds_calculated)


plot_map(municipalities_geo, municipalities_calculated, get_plot_settings("main", "municipalities"), "power_of_2")
plot_map(municipalities_geo, municipalities_calculated, get_plot_settings("main", "municipalities"), "routekaart")
plot_map(municipalities_geo, municipalities_calculated, get_plot_settings("change", "municipalities"), "change_scale")
plot_map(safety_regions_geo, safety_regions_calculated, get_plot_settings("main", "safety-regions"), "power_of_2")
plot_map(safety_regions_geo, safety_regions_calculated, get_plot_settings("main", "safety-regions"), "routekaart")
plot_map(safety_regions_geo, safety_regions_calculated, get_plot_settings("change", "safety-regions"), "change_scale")
# plot_map(ggds_geo, ggds_calculated, get_plot_settings("main", "ggds"), "power_of_2")
# plot_map(ggds_geo, ggds_calculated, get_plot_settings("change", "ggds"), "change_scale")


if (MODUS.tweet) {
  #1
  post_tweet(
    status = get_tweet_1(),
    media = paste0(project_path, "/plots/main-municipalities-power_of_2.png")
  )

  #2
  post_tweet(
    status = get_tweet_2(),
    in_reply_to_status_id = get_last_tweet_id(),
    media = paste0(project_path, "/plots/change-municipalities-change_scale.png")
  )
  
  #3
  post_tweet(
    status = "#corona #kaart
Veiligheidsregio niveau",
    in_reply_to_status_id = get_last_tweet_id(),
    media = paste0(project_path, "/plots/main-safety-regions-power_of_2.png")
  )
  
  #4
  post_tweet(
    status = "Groei / Krimp
Veiligheidsregio niveau",
    in_reply_to_status_id = get_last_tweet_id(),
    media = paste0(project_path, "/plots/change-safety-regions-change_scale.png")
  )
  
  #5
  post_tweet(
    status = "Gemeentes volgens #Routekaart modus",
    in_reply_to_status_id = get_last_tweet_id(),
    media = paste0(project_path, "/plots/main-municipalities-routekaart.png")
  )
  
  #6
  post_tweet(
    status = "Veiligheidsregio's volgens #Routekaart modus",
    in_reply_to_status_id = get_last_tweet_id(),
    media = paste0(project_path, "/plots/main-safety-regions-routekaart.png")
  )
}