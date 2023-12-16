import { html, staticProps } from '../../../mobjs';

export const mobCore_defaults = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobCore/defaults.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="/#mobCore_overview">mobCore</a> / <span>Defaults</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`;
};
