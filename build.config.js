import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

esbuild.build({
    entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: 'docs',
    loader: { '.svg': 'text', '.woff2': 'copy', '.woff': 'copy' },
    plugins: [
        sassPlugin({
            // sass-mq warning, temp disable
            quietDeps: true,
            // type: 'css-text',
        }),
    ],
});
