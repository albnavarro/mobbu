import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

await esbuild.build({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    outdir: 'dist',
    plugins: [sassPlugin()],
});

let ctx = await esbuild.context({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    sourcemap: true,
    outdir: 'dist',
    plugins: [sassPlugin()],
});

await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: 'dist',
});

console.log(host, port);
