import { html, staticProps } from '../../../mobjs';
import { loadJsonContent } from '../../../utils/utils';

export const mobJs_emitAsync = async () => {
    const { data } = await loadJsonContent({
        source: './data/mobJs/emitAsync.json',
    });

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
            <span>emitAsync</span></doc-title-small
        >
        <links-mobjs
            ${staticProps({ section: 'mobjs' })}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">emitAsync</doc-title>
    </doc-container>`;
};
