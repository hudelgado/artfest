var groupTemplateHelper = function () {};
const baseUrlPath = 'https://www.artfestpatrimonios.pt/'

function _build_url(url) {
  return `${baseUrlPath}${url}`;
}
groupTemplateHelper.register = function (Handlebars) {
    Handlebars.registerHelper('parseGroupDesc', function(description) {
      return '\n' + description.map(e => `<p>${e}</p>\n`).join('');
    });
    Handlebars.registerHelper('buildUrl', function(url) {
      return _build_url(url);
    });
    Handlebars.registerHelper('ifIsYoutubeVideo', function(url) {
      return true;
    });
    Handlebars.registerHelper('ifNotFirst', function(index, options) {
      return options[index != 0 ? 'fn' : 'inverse'](this);
    });
    Handlebars.registerHelper('getYoutubeVideoID', function(url) {
      let exp = /https?:\/\/youtu\.be\/(.+)/;
      let results = url.match(exp);
      if (!results) {
        return ''
      }
      return results[1];
    });
};

module.exports = groupTemplateHelper;