import { html, staticProps } from '../../../mobjs';

export const plugin_overview = async () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: './data/plugin/overview.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small">Plugin </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Plugin</doc-title>
    </doc-container>`;
};
