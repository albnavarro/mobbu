import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobJs_slot = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobJs/slot.json',
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
            ><a href="./#mobJs_overview">mobjs</a> / <span>slot</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">slot</doc-title>
    </doc-container>`;
};
