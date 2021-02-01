plot_map <- function(data, settings) {
  ggplot(data = data) +
  geom_polygon(get_aes(settings), color = COLOR.border, lwd = 0.4) +
  get_coord() + 
  labs(
    title = settings$title,
    subtitle = settings$subtitle,
    caption = "Created by: @innouveau"
  ) +
  get_theme(settings) +
  get_scale(settings) +
  annotate(geom="label", x = -213000, y = 535000, label=get_annotation_1(settings), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
  annotate(geom="label", x = -213000, y = 510000, label=get_annotation_2(settings), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
  annotate(geom="label", x = -213000, y = 485000, label=get_annotation_3(settings), label.padding = unit(0.12, "in"), fill="white", hjust = 0, size = 10) +
  ggsave(
    paste0("plots/", settings$filename, ".png"),
    width = (1014 / 72), 
    height = (570 / 72),
    units = "in",
    dpi = 72
  )
}