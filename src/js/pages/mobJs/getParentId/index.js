import { html, staticProps } from '../../../mobjs';

export const mobJs_getParentId = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/getParentId.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>getParentId</span></doc-title-small
        >
        <doc-title slot="section-title">getParentId</doc-title>
    </doc-container>`;
};
