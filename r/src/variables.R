COLOR.border <- rgb(0, 0, 0, max = 255, alpha = 50)
COLOR.background <- "#f5eedc"
COLOR.text <- "#000000"
COLOR.dark <- "#807765"

ICON.hand_pointing_right <- intToUtf8(0x1f449)
ICON.snow <- intToUtf8(0x26C4)


get_plot_settings <- function(type, region_type) {
  if (type == 'main') {
    plot_settings <- list(
      type = "main",
      filename = paste0("main-", region_type),
      title = "Corona status",
      subtitle = format(today, "%A %d %B"),
      legend = "Positieve tests per 100.000 inw. per 7 dagen"
    )
  } else {
    plot_settings <- list(
      type = "change",
      filename = paste0("change-", region_type),
      title = "Groei/Krimp",
      subtitle = format(today, "%A %d %B"),
      legend = "Groei / Krimp"
    )
  }
  return (plot_settings)
}