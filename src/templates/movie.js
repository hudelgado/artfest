const getImages = (images) => {
  let allImages = [];
  if (images) {
    images.featured && allImages.push(images.featured);
    images.filmagens && images.filmagens.length > 0 && allImages.concat(images.filmagens);
    images.exibicao && images.exibicao.length > 0 && allImages.concat(images.exibicao);
  }
  return allImages.map( img => `"${getImgUrl(img.url)}"`).join(',')
}

  const getImgUrl = (url) => `https://www.artfestpatrimonios.pt/${url}`;

  const getVideosTrailers = (movies) => movies && movies.trailer &&
    movies.trailer.map( trailer => `{
      "@type": "VideoObject",
      "name": "${trailer.name}",
      "description": "${trailer.description}",
      "embedUrl": "${trailer.url}",
      "thumbnailUrl": "${getImgUrl(trailer.thumbnailUrl)}",
      "uploadDate": "${trailer.uploadDate}"
    }`).join(',');

export const movieTmpl = (movie) => JSON.parse(`{
  "@context": "https://schema.org/",
  "@type": "Movie",
  "id": "https://www.artfestpatrimonios.pt/detalhes/filme/${movie.slug}",
  "countryOfOrigin": {
    "@type": "Country",
    "name": "Portugal"
  },
  "name": "${movie.name}",
  "headline": "",
  "description": "${movie.description.join('')}"
  ,"productionCompany": {
    "@type": "Organization",
    "name": "GMT Produções"
  }
  ,"director": "Luís Godinho"
  ${movie.dateCreated ? `,"dateCreated": "${movie.dateCreated}"` : ''}
  ${movie.datePublished ? `,"datePublished": "${movie.datePublished}"` : ''}
  ${movie.images ? `,"image": [${getImages(movie.images)}]` : ''}
  ${movie.videos ? `,"trailer": [${getVideosTrailers(movie.videos)}]` : ''}
}`);