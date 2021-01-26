# https://github.com/mzelst/covid-19/blob/master/plot_scripts/daily_maps_plots.R
# https://www.r-graph-gallery.com/327-chloropleth-map-from-geojson-with-ggplot2.html

library(sp)
library(ggplot2)
library(broom)
library(showtext)

font_add_google(name = "montserrat", family = "montserrat")


COLOR.border <- rgb(0, 0, 0, max = 255, alpha = 50)
COLOR.background <- "#f5eedc"
COLOR.text <- "#807765"
GEO.municipalities = "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r/data/gemeentegrenzen2020.geojson"
TEXT.label.main = "Corona Status"
TEXT.label.sub = format(Sys.time(), "%a %b %d")


spdf <- geojson_read(GEO.municipalities,  what = "sp")
spdf_fortified <- fortify(spdf, region = "id")


ggplot(data = spdf_fortified) +
  geom_polygon(aes(x=long, y=lat, group = group), color = COLOR.border, lwd=.1) +
  coord_equal() +
  labs(
    title = TEXT.label.main,
    subtitle = TEXT.label.sub,
    caption = ""
  ) +
  theme(
    text = element_text(family = "montserrat", color = COLOR.text),
    panel.background = element_blank(),
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    plot.background = element_rect(fill = COLOR.background, color = NA),
    plot.title = element_text(size = 22, color = COLOR.text),
    plot.subtitle = element_text(size = 15, color = COLOR.text)
  )
