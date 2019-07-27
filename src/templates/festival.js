const sampleData = {
  "@context": "https://schema.org/",
  "type": "Festival",
  "id": "https://www.artfestpatrimonios.pt",
  "name": "ArtFest Patrimónios",
  "startDate": "01-01-2018",
  "endDate": "28-02-2019",
  "location": [{
    "type": "Place",
    "name": "Évora",
    "address": "Armazém 8"
  }, {
    "type": "Place",
    "name": "Portel",
    "address": "Serões dos Claustros"
  }, {
    "type": "Place",
    "name": "Beja",
    "address": "Jardim Público - Auditório"
  }, {
    "type": "Place",
    "name": "Vidigueira",
    "address": "Largo Frei Antº das Chagas"
  }, {
    "type": "Place",
    "name": "Cuba",
    "address": "Praça Cristovão Colon"
  }],
  "image": "https://www.artfestpatrimonios.pt/images/logo/48x48.png",
  "description": "ArtFest PATRIMÓNIOS inclui trinta e seis espetáculos, seis filmes Documentais e duas exposições fotográficas."
}

export const festivalTmpl = (info) => sampleData