library(dplyr)

file <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r/average-age/data/COVID-19_casus_landelijk.csv"

df <- read.csv(file, sep=";") %>% filter(!is.na(Week_of_death))
df$age[df$Agegroup == '90+'] <- 93
df$age[df$Agegroup == '80-89'] <- 85
df$age[df$Agegroup == '70-79'] <- 75
df$age[df$Agegroup == '60-69'] <- 65
df$age[df$Agegroup == '50-59'] <- 55
df$age[df$Agegroup == '<50'] <- 45



average_per_week <- group_by(df, Week_of_death) %>% summarize(m = mean(age)) %>% filter(!Week_of_death == "202053")
# average_per_week$date <- as.Date(paste0(average_per_week$Week_of_death, "1"), "%Y%U%u")
average_per_week$Week_of_death <- as.Date(paste0(average_per_week$Week_of_death, "1"), "%Y%U%u")

plot(average_per_week)