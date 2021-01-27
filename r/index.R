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
DATA.stripped <- DATA.municipalities[,c("Municipality_code","rel_increase_1d","rel_increase_7d", "municipality")]
# 0 infections = step 0
# 0 - 16 infections = power_of_2
# 16 - 512 infections = power_of_2 minus 3 (to fill the gap between 0 en 2^4)
# > 512 infections = step 6 (power_of_2 for 512 minus 3)
DATA.stripped$power_of_2 <- ifelse(
    DATA.stripped$rel_increase_7d > 0, 
    ifelse(
      DATA.stripped$rel_increase_7d > 16,
      ifelse(
        DATA.stripped$rel_increase_7d > 512,
          6,
          (log(DATA.stripped$rel_increase_7d) / log(2)) - 3
      ),
      log(DATA.stripped$rel_increase_7d) / log(2)
    ),
    0
)


colnames(DATA.stripped)[1] <- "statcode"

MUNICIPALITIES.geo <- geojson_read(MUNICIPALITIES.geo.url,  what = "sp")

# join geo data with test data
MUNICIPALITIES.geo@data <- MUNICIPALITIES.geo@data %>%
  left_join(DATA.stripped,by=c("statcode"))

DATA.fortified <- fortify(MUNICIPALITIES.geo, region = "id")
DATA.merged <- merge(DATA.fortified, MUNICIPALITIES.geo@data, by = "id")

ggplot(data = DATA.merged) +
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
