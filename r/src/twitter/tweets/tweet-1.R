ICON.hand_pointing_right <- intToUtf8(0x1f449)

get_tweet_1 <- function() {
  text <- "Update #corona #kaart 

• %s+ positieve tests
• %s overleden 
• besmettingsgraad: %s

%s zelf kijken in jouw gemeente? https://covid19.innouveau.com/#/?language=nl"
  
  text_merged <- sprintf(text,get_daily_reported_rounded(DATA.ready), get_daily_deceased(DATA.ready), get_infection_rate(DATA.ready), ICON.hand_pointing_right)
  Encoding(text_merged) <- "UTF-8"
  return (text_merged)
}


