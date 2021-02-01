MODUS.tweet = F
MODUS.download = T

COLOR.border <- rgb(0, 0, 0, max = 255, alpha = 50)
COLOR.background <- "#f5eedc"
COLOR.text <- "#000000"
COLOR.dark <- "#807765"

MUNICIPALITIES.geo.url  <- paste0(project_path, "/assets/maps/Gemeentegrenzen2021RD.geojson")
DATA.municipalities <- read.csv(paste0(project_path, "/data/municipalities.csv"))

if (MODUS.download ) {
  DATA.cases <- read.csv("https://data.rivm.nl/covid-19/COVID-19_aantallen_gemeente_per_dag.csv", sep=";") %>% filter(!Municipality_code == "")
} else {
  DATA.cases <- read.csv(paste0(project_path, "/data/COVID-19_aantallen_gemeente_per_dag.csv"), sep=";") %>% filter(!Municipality_code == "")
}

today <- as.Date(last(DATA.cases$Date_of_publication))
