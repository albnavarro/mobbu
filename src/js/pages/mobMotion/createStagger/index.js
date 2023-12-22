import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobMotion_create_stagger = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobMotion/createStagger.json',
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
            <span>CreateStagger</span></doc-title-small
        >
        <scroll-to slot="section-links"></scroll-to>
        <doc-title slot="section-title">CreateStagger</doc-title>
    </doc-container>`;
};
