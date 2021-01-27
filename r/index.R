# https://github.com/mzelst/covid-19/blob/master/plot_scripts/daily_maps_plots.R
# https://www.r-graph-gallery.com/327-chloropleth-map-from-geojson-with-ggplot2.html

library(jsonlite)
library(geojsonio)
library(sp)
library(ggplot2)
library(broom)
library(sysfonts)
library(showtext)
library(dplyr)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"


source(paste0(project_path, "/src/variables.R"))
source(paste0(project_path, "/src/environment.R"))
source(paste0(project_path, "/src/fonts.R"))







# prepair data
DATA.stripped <- DATA.municipalities[,c("Municipality_code","rel_increase_1d","rel_increase_7d")]
colnames(DATA.stripped)[1] <- "statcode"

# map
gemeentegrenzen <- geojson_read(GEO.municipalities,  what = "sp")
gemeentegrenzen@data <- gemeentegrenzen@data %>%
  left_join(DATA.stripped,by=c("statcode"))

g <- fortify(gemeentegrenzen, region = "id")
gemeentegrenzenDF <- merge(g, gemeentegrenzen@data, by = "id")


ggplot(data = gemeentegrenzenDF) +
  geom_polygon(aes(
      x = long, 
      y = lat, 
      group = group,
      fill = `rel_increase_7d`
    ), color = COLOR.border, lwd=.1) +
  coord_sf(xlim = c(-205000, 320000), ylim = c(315000, 615000)) + 
  labs(
    title = TEXT.label.main,
    subtitle = TEXT.label.sub,
    caption = "Created by: @innouveau"
  ) +
  theme(
    legend.position = c(0.1,0.6),
    legend.key = element_blank(),
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
    plot.caption = element_text(family = "regular", size = 14, hjust = 0.04, margin = margin(t = -0.5, unit = "in")),
    plot.margin = unit(c(0,0,0,-0.05), "in")
  ) +
  scale_fill_gradientn(colours=SIGNALINGSYSTEM) +
  ggsave(
    "plots/main.png",
    width= (1014 / 72), 
    height = (570 / 72),
    units = "in",
    dpi = 72
  )
