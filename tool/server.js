/**
 * Dev server util.
 * @module _/tool/server
 */
const { createServer, mergeConfig } = require('vite');

const env = require('./env').getEnv('development');

const { port } = env;

const config = mergeConfig(
    require('../config/vite/vite.dev')(env),
    {
        server: {
            port,
            strictPort: true,
            https: true,
        },
    }
);

createServer(config).then((server) => {
    server.listen().then(() => {
        server.printUrls();
    });
});
