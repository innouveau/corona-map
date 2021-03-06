plot_map <- function(data_geo, data_calculated, settings, col) {
  ggplot(data = data_geo) +
  geom_polygon(get_aes(settings, col), color = COLOR.border, lwd = 0.4) +
  get_coord() + 
  labs(
    fill = settings$legend,
    title = settings$title,
    subtitle = settings$subtitle,
    caption = "Created by: @innouveau"
  ) +
  get_theme(settings) +
  get_scale(settings, col) +
  annotate(geom="label", x = -213000, y = 535000, label=get_annotation_1(settings), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
  annotate(geom="label", x = -213000, y = 510000, label=get_annotation_2(settings, data_calculated), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
  annotate(geom="label", x = -213000, y = 485000, label=get_annotation_3(settings, data_calculated), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
  ggsave(
    paste0("plots/", settings$filename, "-", col, ".png"),
    width = (1014 / 72), 
    height = (570 / 72),
    units = "in",
    dpi = 72
  )
}