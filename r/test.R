detach(package:plyr)

library(jsonlite)
library(geojsonio)
library(sp)
library(ggplot2)
library(broom)
library(sysfonts)
library(showtext)
library(dplyr)
library(rtweet)

project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r"
df <- read.csv(paste0(project_path, "/data/regions/pivot-regions.csv"))


# df2 <- aggregate(df$population, by=list(safetyRegion_code = df$safetyRegion_code), FUN = sum)

df2 <- df %>% 
  group_by(safetyRegion_code) %>% 
  summarise(
      population = sum(population),
      population2 = sum(population)
    )