library(rtweet)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"
source(paste0(project_path, "/src/credentials.R"))


twitter_token <- create_token(
  app = appname,
  consumer_key = key,
  consumer_secret = secret,
  access_token = access_token,
  access_secret = access_secret)

tweet1 <- "Test 1"
tweet2 <- "Test 2"

post_tweet(
  status = tweet1,
  media = "" # File path to image or video media to be included in tweet.
)

## lookup status_id
my_timeline <- get_timeline(rtweet:::home_user())
## ID for reply
reply_id <- my_timeline$status_id[1]
## post reply
post_tweet(tweet2,in_reply_to_status_id = reply_id)