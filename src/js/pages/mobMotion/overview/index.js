import { html, staticProps } from '../../../mobjs';

export const mobMotion_overview = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobMotion/overview.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobMotion 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobMotion</doc-title>
    </doc-container>`;
};
