import { html, staticProps } from '../../../mobjs';

export const mobJs_getChildren = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/getChildren.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>getChildren</span></doc-title-small
        >
        <doc-title slot="section-title">getChildren</doc-title>
    </doc-container>`;
};
