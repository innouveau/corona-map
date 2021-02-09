require(RJSONIO)  
project_path <- "/Users/jeroen/Documents/_work/innouveau/projects/innouveau/corona-map/dev/"
json_file <- paste0(project_path, "frontend/public/data/maps/nederland/cities.json")

result <- fromJSON(file = json_file)

json_data_frame <- as.data.frame(result)
