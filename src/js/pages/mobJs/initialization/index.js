import { html, staticProps } from '../../../mobjs';

export const mobJs_initialization = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/initialization.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="/#mobJs_overview">mobjs</a> / <span>initialization</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Initialization</doc-title>
    </doc-container>`;
};
