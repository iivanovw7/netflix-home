/**
 * View util.
 * @module _/tool/view
 */
import LocalWebServer from 'local-web-server';
import env from './env.js';
import pc from 'picocolors';

const { port } = env.getEnv('production');

const serverConfig = {
    directory: './build/dist',
    port,
    logFormat: 'dev',
    spa: 'index.html'
};

LocalWebServer
    .create(serverConfig)
    .then((webServer) => {
        webServer.on('verbose', function verboseListener(key, value) {
            if (key === 'server.listening') {
                console.log(pc.magenta(`Serving at ${value.map((item) => item.url).join(', ')}`))
            }
        });
    });




