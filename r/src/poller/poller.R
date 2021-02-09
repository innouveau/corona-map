check_source <- function(url, expected_date) {
  print("Downloading source...")
  data <- read.csv(url, sep=";") %>% filter(!Municipality_code == "")
  today <- as.Date(last(data$Date_of_publication))
  if (today == expected_date) {
    return (data)
  } else {
    return (NULL)
  }
}

poll <- function(url, expected_date) {
  data <- check_source(url, expected_date)
  if (is.null(data)) {
    print("Data does not match. Trying again in  a few moments...")
    Sys.sleep(5)
    return (poll(url, expected_date))
  } else {
    print ("Found data")
    return (data);
  }
}