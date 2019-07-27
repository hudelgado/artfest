const getImgUrl = (url) => `https://www.artfestpatrimonios.pt/${url}`;

const getEvents = (show) =>  {
  return Object.values(show.schedule || {}).map(event => `{
    "@type": "Event",
    "name": "${show.name} @ ${event.location}",
    "description": "${show.genre}",
    "image": "${getImgUrl(show.images.featured.url)}",
    "location": {
      "@type": "Place",
       "name": "${event.place}",
       "address": "${event.location}"
    },
    "performer": {
      "@type": "PerformingGroup",
        "name": "${show.name}"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.artfestpatrimonios.pt",
      "price": "0",
      "priceCurrency": "EUR",
      "validFrom": "${event.date}",
      "validThrough": "${event.date}",
      "availability": "free"
    },
    "startDate": "${event.date}"
  }`).join(',');
}
// Object.values(show.schedule || {});
export const showTmpl = (show) => JSON.parse(`{
  "@context": "https://schema.org/",
  "@type": "PerformingGroup",
  "id": "https://www.artfestpatrimonios.pt/detalhes/grupo/${show.slug}",
  "name": "${show.name}",
  "description": "${show.bio.join('')}",
  "events": [${getEvents(show)}]
}`);