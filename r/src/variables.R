COLOR.border <- rgb(0, 0, 0, max = 255, alpha = 50)
COLOR.background <- "#f5eedc"
COLOR.text <- "#000000"

SIGNALINGSYSTEM <- c("#8DC63F", "#CBDA2D", "#FFF200", "#FDB913", "#F48221", "#ED1C24", "#D91872", "#000000")
# SIGNALINGSYSTEM <- c("#8DC63F", "#F48221", "black")

MUNICIPALITIES.geo.url  <- paste0(project_path, "/assets/maps/Gemeentegrenzen2021RD.geojson")
DATA.municipalities <- read.csv(paste0(project_path, "/data/municipalities.csv"))
DATA.cases <- read.csv(paste0(project_path, "/data/COVID-19_aantallen_gemeente_per_dag.csv"), sep=";") %>% filter(!Municipality_code == "")
TEXT.label.main <- "Corona Status"
TEXT.label.sub <- format(Sys.time(), "%A %d %b")
today <- as.Date(last(DATA.cases$Date_of_publication))
