import { html, staticProps } from '../../../mobjs';

export const mobCore_overview = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobCore/overview.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobCore 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobCore</doc-title>
    </doc-container>`;
};
