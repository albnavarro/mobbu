import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import http from 'node:http';
import chokidar from 'chokidar';
import { reload } from './reload.js';

const clients = [];
const proxiPort = 3000;

const ctx = await esbuild.context({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    sourcemap: true,
    outdir: 'docs',
    banner: {
        js: reload,
    },
    loader: { '.svg': 'text' },
    plugins: [
        sassPlugin({
            // sass-mq warning, temp disable
            quietDeps: true,
            // type: 'css-text',
        }),
    ],
    logLevel: 'info',
});

await ctx.watch();

const { host, port } = await ctx.serve({
    servedir: 'docs',
});

// Then start a proxy server on port 3000
http.createServer((request, response) => {
    const options = {
        hostname: host,
        port: port,
        path: request.url,
        method: request.method,
        headers: request.headers,
    };

    clients.push(response);

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, (proxyRes) => {
        // Forward the response from esbuild to the client
        response.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(response, { end: true });
    });

    // Forward the body of the request to esbuild
    request.pipe(proxyReq, { end: true });
}).listen(proxiPort);

chokidar
    .watch(['./docs/**/*.html', './docs/**/*.json'])
    .on('change', (page) => {
        console.log(`[update] ${page}`);

        clients.forEach((response) => {
            response.write(`event: change\n`);
            response.write(`data: {"page": ${page}}\n\n`);
            response.end();
        });
        clients.length = 0;
    });

console.log(` > proxy: http://127.0.0.1:${proxiPort}`);
console.log(``);
