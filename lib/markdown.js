const hljs = require('highlight.js');
const mdit = require('markdown-it');
const emoji = require('markdown-it-emoji');
const classes = require('@toycode/markdown-it-class');
const helper = require('./helper');

let md = null;

module.exports = function (source, options) {
  if (!md) {
    md = mdit({
      html: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return `<pre v-pre class="hljs">${hljs.highlight(lang, str, true).value}<code></code></pre>`;
          } catch (error) {
            console.error(error);
          }
        } else {
          return '';
        }
      }
    });
    helper.handleVueBlock(md, options);
    // 支持 emoji
    if (options.emoji === true) {
      md.use(emoji);
    }
    // 支持自定义 class
    if (options.classPrefix) {
      md.use(classes, helper.classMapping(options.classPrefix));
    }
    if (options.mdUse && typeof options.mdUse === 'function') {
      options.mdUse(md);
    }
  }
  return md.render(source);
}

