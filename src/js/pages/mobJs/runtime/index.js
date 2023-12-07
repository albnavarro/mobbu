import { html, staticProps } from '../../../mobjs';

export const mobJs_runtime = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/runtime.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="/#mobJs_overview">mobjs</a> / <span>runtime</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Runtime</doc-title>
    </doc-container>`;
};
