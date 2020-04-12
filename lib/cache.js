const cache = {};
let currentFileId = '';
let currentFileName = '';

module.exports = {
  getSourceCodeCache(fileId) {
    return cache[fileId] && cache[fileId].source;
  },
  setSourceCodeCache(fileId, code) {
    cache[fileId].source = code;
  },
  getRenderCodeCache(fileId) {
    return cache[fileId] && cache[fileId].render;
  },
  setRenderCodeCache(fileId, code) {
    cache[fileId].render = code;
  },
  getBlockCodeCache(fileId, blockId) {
    return cache[fileId].blocks[blockId];
  },
  setBlockCodeCache(code) {
    const id = cache[currentFileId].id++;
    const name = `${currentFileName}Block${id}`;
    cache[currentFileId].blocks[id] = code;
    cache[currentFileId].names.push({ id, name });
    return name;
  },
  getBlockNamesCache() {
    return cache[currentFileId].names;
  },
  resetFileCache(fileId) {
    cache[fileId] = {
      id: 0,
      source: '',
      render: '',
      blocks: {},
      names: []
    };
  },
  setCurrentFile(id, name) {
    currentFileId = id;
    currentFileName = name;
  }
}
