const container = require('markdown-it-container');
const cache = require('./cache');

function handleVueBlock(md, options) {
  md.use(container, 'vue', {
    validate(params) {
      return /^vue/.test(params.trim());
    },
    render(tokens, index) {
      const wrapTagName = options.wrapBlock;
      if (tokens[index].nesting === 1) {
        const m = tokens[index].info.trim().match(/^vue\s+(.*)$/);
        // m[1] 是指 vue 后面描述的内容
        const blockDesc = m && m.length > 1 ? m[1] : '';
        const explain = blockDesc !== '' ? `<template slot="explain">${md.render(blockDesc)}</template>` : '';
        // fence 是指代码块，如果下一个 token 是 fence
        const vueCode = tokens[index + 1].type === 'fence' ? tokens[index + 1].content : '';
        // 设置 vue block 缓存并获取其对应的组件名称
        const compName = cache.setBlockCodeCache(vueCode);
        return `<${wrapTagName}>${explain}<${compName} slot="content" />`;
      } else if (tokens[index].nesting === -1) {
        return `</${wrapTagName}>`;
      } 
    }
  });
  // md.use(mdContainer, 'tip');
  // md.use(mdContainer, 'warning');
}

function classMapping(prefix) {
  return {
    h1: `${prefix}-h1`,
    h2: `${prefix}-h2`,
    h3: `${prefix}-h3`,
    h4: `${prefix}-h4`,
    h5: `${prefix}-h5`,
    h6: `${prefix}-h6`,
    hr: `${prefix}-hr`,
    a: `${prefix}-a`,
    p: `${prefix}-p`,
    img: `${prefix}-img`,
    input: `${prefix}-input`,
    pre: `${prefix}-pre`,
    code: `${prefix}-code`,
    kbd: `${prefix}-kbd`,
    details: `${prefix}-details`,
    summary: `${prefix}-summary`,
    blockquote: `${prefix}-blockquote`,
    strong: `${prefix}-strong`,
    table: `${prefix}-table`,
    tr: `${prefix}-tr`,
    th: `${prefix}-th`,
    td: `${prefix}-td`,
    ol: `${prefix}-ol`,
    ul: `${prefix}-ul`,
    li: `${prefix}-li`,
    dd: `${prefix}-dd`,
    dl: `${prefix}-dl`,
    dt: `${prefix}-dt`
  };
}

module.exports = {
  classMapping,
  handleVueBlock
};

