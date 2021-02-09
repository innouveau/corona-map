get_annotation_1 <- function(settings) {
  if (settings$type == 'main') {
    text <- "• %s+ positieve tests"
    text_merged <- sprintf(text, get_daily_reported_rounded())
  } else {
    text <- "• %s groei"
    change <- get_change_netherlands()
    if (change > 0) {
      text_merged <- paste0("• Groei NL t.o.v. vorige week: ", change, "%")
    } else {
      text_merged <- paste0("• Krimp NL t.o.v. vorige week: ", abs(change), "%")
    }
  }
  return (text_merged)
}

get_annotation_2 <- function(settings, data) {
  if (settings$type == 'main') {
    text <- "• %s overleden"
    text_merged <- sprintf(text, get_daily_deceased())
  } else {
    text_merged <- paste0("• Grootste stijger: ", get_change_highest(data))
  }
  return (text_merged)
}

get_annotation_3 <- function(settings, data) {
  if (settings$type == 'main') {
    text <- "• besmettingsgraad: %s"
    text_merged <- sprintf(text, get_infection_rate())
  } else {
    text_merged <- paste0("• Grootste daler: ", get_change_lowest(data))
  }
  return (text_merged)
}