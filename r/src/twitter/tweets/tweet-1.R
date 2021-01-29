ICON.hand_pointing_right <- intToUtf8(0x1f449)

get_tweet_1 <- function() {
  text <- "Update #corona #kaart 

• 4400+ positieve tests
• 58 overleden 
• besmettingsgraad +183

%s zelf kijken in jouw gemeente? https://covid19.innouveau.com/#/?language=nl"
  
  text_merged <- sprintf(text, ICON.hand_pointing_right)
  Encoding(text_merged) <- "UTF-8"
  return (text_merged)
}


