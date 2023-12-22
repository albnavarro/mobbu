import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobJs_syncParent = async () => {
    const { success, data } = await loadJsonContent({
        source: './data/mobJs/syncParent.json',
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
            ><a href="./#mobJs_overview">mobjs</a> /
            <a href="./#mobJs_component">component</a> /
            <span>syncParent</span></doc-title-small
        >
        <links-mobjs
            ${staticProps({ section: 'mobjs' })}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">syncParent</doc-title>
    </doc-container>`;
};
