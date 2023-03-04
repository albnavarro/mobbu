import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import http from 'node:http';
import chokidar from 'chokidar';

const clients = [];

await esbuild.build({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    outdir: 'dist',
    plugins: [sassPlugin()],
});

const ctx = await esbuild.context({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    sourcemap: true,
    outdir: 'dist',
    plugins: [sassPlugin()],
});

await ctx.watch();

const { host, port } = await ctx.serve({
    servedir: 'dist',
});

// Then start a proxy server on port 3000
http.createServer((req, res) => {
    const options = {
        hostname: host,
        port: port,
        path: req.url,
        method: req.method,
        headers: req.headers,
    };

    clients.push(res);

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, (proxyRes) => {
        // If esbuild returns "not found", send a custom 404 page
        // if (proxyRes.statusCode === 404) {
        //     res.writeHead(404, { 'Content-Type': 'text/html' });
        //     res.end('<h1>A custom 404 page</h1>');
        //     return;
        // }

        // Otherwise, forward the response from esbuild to the client
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    // Forward the body of the request to esbuild
    req.pipe(proxyReq, { end: true });
}).listen(3000);

chokidar.watch('dist/**/*.html').on('change', () => {
    clients.forEach((res) => res.write('data: update\n\n'));
    clients.length = 0;
});

console.log(host, '3000');
