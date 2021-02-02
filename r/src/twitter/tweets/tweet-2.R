get_tweet_2 <- function() {
  text <- "Groei / Krimp 

%s zelf kijken in jouw gemeente voor groei / krimp? https://covid19.innouveau.com/#/change?language=nl"
  
  text_merged <- sprintf(text, ICON.hand_pointing_right)
  Encoding(text_merged) <- "UTF-8"
  return (text_merged)
}


