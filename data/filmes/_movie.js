var movieTemplateHelper = function () {};
const baseUrlPath = 'https://www.artfestpatrimonios.pt/'

function _build_url(url) {
  return `${baseUrlPath}${url}`;
}
movieTemplateHelper.register = function (Handlebars) {
    Handlebars.registerHelper('getImagesObj', function(images) {
        if (!images || !images.featured || !images.filmagens || !images.estreia) {
          return '"{}"';
        }
        var ret = '[';
        if (images.featured) {
          ret += `"${baseUrlPath}${images.featured}"\n`;
        }
        if (images.estreia) {
          ret += ',' + images.estreia.map(e => `"${baseUrlPath}${e}"`).join(',\n');
        }
        if (images.filmagens) {
          ret += ',' + images.filmagens.map(e => `"${baseUrlPath}${e}"`).join(',\n');
        }
        return `${ret}]`;
    });
    Handlebars.registerHelper('getMovieDescInHTML', function(description) {
      return '\n' + description.map(e => `<p>${e}</p>\n`).join('');
    });
    Handlebars.registerHelper('joinMovieDesc', function(description) {
      return Array.prototype.join.call(description, " ");
    });
    Handlebars.registerHelper('buildUrl', function(url) {
      return _build_url(url);
    });
    Handlebars.registerHelper('isVimeoVideo', function(url) {
      return true;
    });
    Handlebars.registerHelper('getVimeoVideoID', function(url) {
      let exp = /https?:\/\/player\.vimeo\.com\/video\/(\d+)/;
      let results = url.match(exp);
      if (!results) {
        return ''
      }
      return results[1];
    });
};

module.exports = movieTemplateHelper;