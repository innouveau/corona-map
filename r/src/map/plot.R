plot_map <- function(data) {
  ggplot(data = data) +
    geom_polygon(aes(
      x = long, 
      y = lat, 
      group = group,
      fill = `power_of_2`
    ), color = COLOR.border, lwd = 0.4) +
    coord_sf(xlim = c(-205000, 320000), ylim = c(315000, 615000)) + 
    labs(
      title = TEXT.label.main,
      subtitle = TEXT.label.sub,
      caption = "Created by: @innouveau"
    ) +
    theme(
      legend.position = c(0.185,0.55),
      legend.title = element_blank(),
      legend.background = element_rect(fill = "transparent", color = NA),
      legend.key.height = unit(0.5, "in"),
      legend.spacing.y = unit(0.1, 'in'),
      legend.text = element_text(family = "regular", size = 12),
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
      plot.caption = element_text(family = "regular", size = 14, hjust = 0.035, margin = margin(t = -0.5, unit = "in")),
      plot.margin = unit(c(0,0,0,-0.05), "in")
    ) +
    scale_fill_gradientn(
      colours = SIGNALINGSYSTEM,
      breaks = c(0, 1, 2, 3, 4, 5, 6),
      limits = c(0,6),
      labels = c("0", "16", "32", "64", "128", "256", "512 positieve tests per 100.000 inwoners per week")
    ) +
    ggsave(
      "plots/main.png",
      width= (1014 / 72), 
      height = (570 / 72),
      units = "in",
      dpi = 72
    )
}