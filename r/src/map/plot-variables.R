get_theme <- function(settings) {
  if (settings$type == "main") {
    mytheme <- theme(
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
    )
  } else {
    mytheme <- theme(
      legend.position = c(0.08,0.40),
      legend.title = element_text(family = "regular", size = 14, vjust = 2),
      legend.background = element_rect(fill = "transparent", color = NA),
      legend.key.height = unit(0.2, "in"),
      legend.key.width = unit(0.3, "in"),
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
    )
  }
  return (mytheme)
}

get_aes <- function(settings, col) {
  if (settings$type == "main") {
    if (col == 'power_of_2') {
      myaes <- aes(
        x = long, 
        y = lat, 
        group = group,
        fill = `power_of_2`
      )
    } else {
      myaes <- aes(
        x = long, 
        y = lat, 
        group = group,
        fill = `routekaart`
      )
    }
  } else {
    myaes <- aes(
      x = long, 
      y = lat, 
      group = group,
      fill = `change_scale`
    )
  }
  return (myaes)
}

get_scale <- function(settings, col) {
  if (settings$type == "main") {
    if (col == 'power_of_2') {
      myscale <- scale_fill_gradientn(
        colours = c("#8DC63F", "#CBDA2D", "#FFF200", "#FDB913", "#F48221", "#ED1C24", "#D91872", "#000000"),
        breaks = c(0, 1, 2, 3, 4, 5, 6),
        limits = c(0,6),
        labels = c("0", "16", "32", "64", "128", "256", "512")
      )
    } else {
      myscale <- scale_fill_gradientn(
        colours = c("#90FA05", "#F093BC", "#D95F94", "#BA2667", "#670630"),
        breaks = c(1, 2, 3, 4, 5),
        limits = c(1, 5),
        labels = c("Geen", "Waakzaam", "Zorgelijk", "Ernstig", "Zeer ernstig")
      )
    }
  } else {
    myscale <- scale_fill_gradientn(
      colours = c("#014a0b", "#ffffff", "#FF0000"),
      breaks = c(-1, 0, 1),
      limits = c(-1,1),
      labels = c("-50%", "0", "+100%")
    )
  }
  
  return (myscale)
}

get_coord <- function() {
  mycoord <- coord_sf(
      xlim = c(-205000, 325000), 
      ylim = c(315000, 615000)
  )
  return (mycoord)
}