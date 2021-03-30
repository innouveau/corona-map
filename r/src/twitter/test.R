library(rtweet)

project_path <- "/Users/jeroenbreen/Documents/work/innouveau/projects/innouveau/corona-map/dev/r"


source(paste0(project_path, "/src/twitter/credentials.R"))


twitter_token <- create_token(
  app = twitter_appname,
  consumer_key = twitter_api_key,
  consumer_secret = twitter_api_key_secret,
  access_token = twitter_access_token,
  access_secret = twitter_access_token_secret)

post_tweet(
  status = "TEST"
)