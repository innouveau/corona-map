FONT.black <- paste0(project_path, "/assets/fonts/montserrat/Montserrat-Black.ttf")
FONT.bold  <- paste0(project_path, "/assets/fonts/montserrat/Montserrat-Bold.ttf")
FONT.regular  <- paste0(project_path, "/assets/fonts/montserrat/Montserrat-Regular.ttf")

font_add(family = "black", regular = FONT.black)
font_add(family = "bold", regular = FONT.bold)
font_add(family = "regular", regular = FONT.regular)

showtext_auto()