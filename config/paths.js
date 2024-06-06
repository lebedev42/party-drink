const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  entryPoint: path.resolve(root, 'src', 'index.tsx'),
  hotEntryPoint: path.resolve(root, 'src', 'hmr.ts'),
  src: path.resolve(root, 'src'),
  build: path.resolve(root, 'build'),
  public: path.resolve(root, 'public'),
  assets: path.resolve(root, 'public/images'),
};
