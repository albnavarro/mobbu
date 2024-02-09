import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const svg_overview = async () => {
    const { data } = await loadJsonContent({
        source: './data/svg/overview.json',
    });

    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small">Svg</doc-title-small>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Svg</doc-title>
    </doc-container>`;
};
