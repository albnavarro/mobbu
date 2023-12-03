import { html, staticProps } from '../../../mobjs';

export const mobJs_watchParent = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/watchParent.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>watchParent</span></doc-title-small
        >
        <doc-title slot="section-title">watchParent</doc-title>
    </doc-container>`;
};
