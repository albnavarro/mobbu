import { html, staticProps } from '../../../mobjs';

export const mobCore_store = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: './data/mobCore/store.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Store</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Store</doc-title>
    </doc-container>`;
};
