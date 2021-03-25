library(dplyr)

file <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/r/average-age/data/COVID-19_casus_landelijk.csv"

df <- read.csv(file, sep=";") %>% filter(Hospital_admission == "Yes") %>% filter(!Agegroup == "Unknown")
df$age[df$Agegroup == '90+'] <- 93
df$age[df$Agegroup == '80-89'] <- 85
df$age[df$Agegroup == '70-79'] <- 75
df$age[df$Agegroup == '60-69'] <- 65
df$age[df$Agegroup == '50-59'] <- 55
df$age[df$Agegroup == '<50'] <- 45
df$age[df$Agegroup == '40-49'] <- 45
df$age[df$Agegroup == '30-39'] <- 35
df$age[df$Agegroup == '20-29'] <- 25
df$age[df$Agegroup == '10-19'] <- 15
df$age[df$Agegroup == '0-9'] <- 5


df$new_date = paste0(substr(df$Date_statistics, 1, 7), "-01")
average_per_month <- group_by(df, new_date) %>% summarize(m = mean(age))
average_per_month$new_date = as.Date(average_per_month$new_date)
plot(average_per_month)