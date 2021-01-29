get_annotation_1 <- function() {
  text <- "• %s+ positieve tests"
  total_reported <- 100 * floor(DATA.ready$Total_reported_today[1] / 100)
  text_merged <- sprintf(text, total_reported)
  return (text_merged)
}

get_annotation_2 <- function() {
  text <- "• %s overleden"
  total_deceased <- DATA.ready$Deceased[1]
  text_merged <- sprintf(text, total_deceased)
  return (text_merged)
}

get_annotation_3 <- function() {
  text <- "• besmettingsgraad: %s"
  infection_rate <- DATA.ready$Total_reported_this_week_relative[1]
  text_merged <- sprintf(text, infection_rate)
  return (text_merged)
}

plot_map <- function(data) {
  ggplot(data = data) +
    geom_polygon(aes(
      x = long, 
      y = lat, 
      group = group,
      fill = `Positieve tests per 100.000 inw. per 7 dagen`
    ), color = COLOR.border, lwd = 0.4) +
    coord_sf(xlim = c(-205000, 325000), ylim = c(315000, 615000)) + 
    labs(
      title = TEXT.label.main,
      subtitle = TEXT.label.sub,
      caption = "Created by: @innouveau"
    ) +
    theme(
      legend.position = c(0.185,0.32),
      legend.title = element_text(family = "regular", size = 14, vjust = 2),
      legend.background = element_rect(fill = "transparent", color = NA),
      legend.key.height = unit(0.5, "in"),
      legend.key.width = unit(0.4, "in"),
      legend.spacing.y = unit(0.1, 'in'),
      legend.text = element_text(family = "regular", size = 11),
      axis.line = element_blank(),
      axis.ticks = element_blank(),
      axis.title = element_blank(),
      axis.text = element_blank(),
      panel.background = element_rect(fill = COLOR.background, color = NA),
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      plot.background = element_rect(fill = COLOR.background, color = NA),
      plot.title = element_text(family = "black", size = 58, vjust = -0.5, hjust = 0.044, margin = margin(b = -0.05, unit = "in")),
      plot.subtitle = element_text(family = "bold", size = 35, vjust = -2, hjust = 0.04, margin = margin(b = -1.5, unit = "in")),
      plot.caption = element_text(family = "regular", size = 14, hjust = 0.98, margin = margin(t = -0.5, unit = "in")),
      plot.margin = unit(c(0,0,0,-0.05), "in")
    ) +
    scale_fill_gradientn(
      colours = SIGNALINGSYSTEM,
      breaks = c(0, 1, 2, 3, 4, 5, 6),
      limits = c(0,6),
      labels = c("0", "16", "32", "64", "128", "256", "512")
    ) +
    annotate(geom="label", x = -213000, y = 535000, label=get_annotation_1(), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
    annotate(geom="label", x = -213000, y = 510000, label=get_annotation_2(), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
    annotate(geom="label", x = -213000, y = 485000, label=get_annotation_3(), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
    ggsave(
      "plots/main.png",
      width= (1014 / 72), 
      height = (570 / 72),
      units = "in",
      dpi = 72
    )
}