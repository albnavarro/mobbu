import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobCore_overview = async ({ params }) => {
    console.log(params);

    const { success, data } = await loadJsonContent({
        source: './data/mobCore/overview.json',
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
            >mobCore 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">mobCore</doc-title>
    </doc-container>`;
};
