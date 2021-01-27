library(rtweet)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"
source(paste0(project_path, "/src/credentials.R"))


twitter_token <- create_token(
  app = appname,
  consumer_key = key,
  consumer_secret = secret,
  access_token = access_token,
  access_secret = access_secret)

post_tweet(
  status = "Test",
  media = "" # File path to image or video media to be included in tweet.
)