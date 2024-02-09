import { html, staticProps } from '../../mobjs';
import { loadJsonContent } from '../../utils/utils';

export const about = async () => {
    const { data } = await loadJsonContent({
        source: './data/about.json',
    });

    return html`<doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small">About </doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">About</doc-title>
    </doc-container>`;
};
