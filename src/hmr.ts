// HMR fixing reference  https://github.com/TypeStrong/ts-loader#hot-module-replacement

/* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

require('./index');

if (module.hot) {
  module.hot.accept(['./index'], () => {
    require('./index');
  });
}

export {};
