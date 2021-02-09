get_tweet_1 <- function() {
  text <- "Update #corona #kaart 
  
Let op: lage cijfers vanwege %s

• %s+ positieve tests
• %s overleden 
• besmettingsgraad: %s

%s zelf kijken in jouw gemeente? https://covid19.innouveau.com/#/?language=nl
(update omstreeks 15:30)"
  
  text_merged <- sprintf(text, ICON.snow, get_daily_reported_rounded(), get_daily_deceased(), get_infection_rate(), ICON.hand_pointing_right)
  Encoding(text_merged) <- "UTF-8"
  return (text_merged)
}


get_tweet_2 <- function() {
  text <- "Groei / Krimp 

%s zelf kijken in jouw gemeente voor groei / krimp? https://covid19.innouveau.com/#/change?language=nl"
  
  text_merged <- sprintf(text, ICON.hand_pointing_right)
  Encoding(text_merged) <- "UTF-8"
  return (text_merged)
}