get_last_tweet_id <- function() {
    twitter_timeline <- get_timeline(user = "innouveau")
    tweet_id <- twitter_timeline$status_id[1]
    return (tweet_id);
}