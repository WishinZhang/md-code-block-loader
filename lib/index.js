const loaderUtils = require('loader-utils');
const cache = require('./cache');
const builder = require('./builder');
const markdown = require('./markdown');

/**
 * options: 配置说明
 *   type: String，默认为空，处理的语言(Vue、React等等)
 *   emoji: Boolean，默认为 true，是否支持 emoji
 *   classPrefix: String，默认为 md-vue-block，给解析的 HTML 代码添加 class，配置该参数可以防止 markdown 的样式和别的样式产生冲突。
 *   mdUse: Function，默认为空，给 markdown-it 添加插件，以支持更多的自定义 markdown 语法，返回一个创建好的 markdown-it 对象参数，通过 md.use 即可安装 markdown-it 插件。
 *   wrapBlock: String，默认为一个 div 元素，包裹解析结果 vue 组件名称(全局注册的)，解析的结果有3个部分(explain、content、code)，会使用 slot 方式插入到该组件中。
 *   wrapClass: String，默认为 md-vue-block-wrap，整个 markdown 解析完之后会使用一个 div 包裹起来，该配置项用于设置改 div 的class。
 */

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  // 设置默认配置
  options.emoji = options.emoji === undefined ? true : options.emoji;
  options.classPrefix = options.classPrefix === undefined ? 'md-vue-block' : options.classPrefix;
  options.wrapBlock = options.wrapBlock === undefined ? 'div' : options.wrapBlock;
  options.wrapClass = options.wrapClass === undefined ? 'md-vue-block-wrap' : options.wrapClass;
  const querystring = this.resourceQuery || '';
  const query = querystring ? loaderUtils.parseQuery(querystring) : {};
  const paths = this.resourcePath.split('/');
  const fileId = paths.join('_');
  const fileName = paths[paths.length - 1].split('.')[0];
  if (query.blockId !== undefined) {
    const result = cache.getBlockCodeCache(fileId, query.blockId);
    return result;
  } else {
    const cacheSourceCode = cache.getSourceCodeCache(fileId);
    if (query.vue || cacheSourceCode === source) {
      return cache.getRenderCodeCache(fileId);
    } else {
      cache.resetFileCache(fileId);
      cache.setCurrentFile(fileId, fileName);
      const html = markdown(source, options);
      const result = builder(html, this.resourcePath, fileName, querystring, options);
      cache.setSourceCodeCache(fileId, source);
      cache.setRenderCodeCache(fileId, result);
      return result;
    }
  }
}

