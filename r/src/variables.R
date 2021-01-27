COLOR.border <- rgb(0, 0, 0, max = 255, alpha = 50)
COLOR.background <- "#f5eedc"
COLOR.text <- "#000000"

SIGNALINGSYSTEM <- c("#8DC63F", "#CBDA2D", "#FFF200", "#FDB913", "#F48221", "#ED1C24", "#D91872", "#000000")
# SIGNALINGSYSTEM <- c("#8DC63F", "#F48221", "black")

MUNICIPALITIES.geo.url  <- paste0(project_path, "/assets/maps/Gemeentegrenzen2021RD.geojson")
DATA.municipalities <- read.csv("https://raw.githubusercontent.com/mzelst/covid-19/master/data/municipality-today-detailed.csv")

TEXT.label.main <- "Corona Status"
TEXT.label.sub <- format(Sys.time(), "%A %d %b")
