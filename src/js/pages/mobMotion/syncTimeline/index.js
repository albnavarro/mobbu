import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobMotion_sync_timeline = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobMotion/syncTimeline.json',
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
            ><a href="./#mobMotion_overview">mobMotion</a> /
            <span>Sync timeline</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">Sync timeline</doc-title>
    </doc-container>`;
};
