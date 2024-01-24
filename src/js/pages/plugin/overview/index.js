import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const plugin_overview = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/logo.svg',
    });

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
        <m-logo-1 ${staticProps({ svg })}></m-logo-1>
    </doc-container>`;
};
