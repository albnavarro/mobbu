import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobCore_events = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobCore/events.json',
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
            ><a href="./#mobCore_overview">mobCore</a> / <span>Events</span>
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Events</doc-title>
    </doc-container>`;
};
