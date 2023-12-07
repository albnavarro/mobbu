import { html, staticProps } from '../../../mobjs';

export const mobJs_routing = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/routing.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="/#mobJs_overview">mobjs</a> / <span>routing</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">routing</doc-title>
    </doc-container>`;
};
