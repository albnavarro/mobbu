import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const canvas_overview = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/canvas/overview.json',
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
            >Canvas 
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Canvas</doc-title>
    </doc-container>`;
};
