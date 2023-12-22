import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobCore_store = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobCore/store.json',
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
            ><a href="./#mobCore_overview">mobCore</a> / <span>Store</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Store</doc-title>
    </doc-container>`;
};
