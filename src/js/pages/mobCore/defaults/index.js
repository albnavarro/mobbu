import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobCore_defaults = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobCore/defaults.json',
    });

    if (!success) {
        console.warn('fetch data fail');
        return [];
    }

    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                data: data.data,
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="./#mobCore_overview">mobCore</a> / <span>Defaults</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Defaults</doc-title>
    </doc-container>`;
};
