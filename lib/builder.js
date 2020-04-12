const cache = require('./cache');

module.exports = function(html, filePath, fileName, querystring, options) {
  const blocks = cache.getBlockNamesCache();
  let importList = '';
  let compNames = '';
  for (const block of blocks) {
    importList += `import ${block.name} from "${filePath}?${querystring}&blockId=${block.id}";`;
    compNames += `${block.name}`;
  }
  return `
    <template>
      <div class="${options.wrapClass}">${html}</div>
    </template>
    <script>
    ${importList}
    export default {
      name: "${fileName}",
      components: {
        ${compNames}
      }
    }
    </script>
  `;
}

