import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/simple-listen.umd.js';
config.moduleName = 'rollupStarterProject';

export default config;
