import { html, staticProps } from '../../../mobjs';

export const mobJs_removeDom = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/removeDom.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>removeDom</span></doc-title-small
        >
        <doc-title slot="section-title">removeDom</doc-title>
    </doc-container>`;
};
