library(rtweet)

project_path <- "/Users/jeroenbreen/Documents/work/innouveau/projects/innouveau/corona-map/code/r"


source(paste0(project_path, "/src/twitter/credentials.R"))


post_tweet(
  status = "TEST",
  media = paste0(project_path, "/plots/main-municipalities-power_of_2.png")
)