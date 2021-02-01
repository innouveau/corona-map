library(rtweet)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"


source(paste0(project_path, "/src/twitter/credentials.R"))
source(paste0(project_path, "/src/twitter/tweets/tweet-1.R"))


post_tweet(
  status = get_tweet_1(),
  media = paste0(project_path, "/plots/main.png")
)