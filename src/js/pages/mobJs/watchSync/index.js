import { html, staticProps } from '../../../mobjs';

export const mobJs_watchSync = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/watchSync.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>watchSync</span></doc-title-small
        >
        <doc-title slot="section-title">watchSync</doc-title>
    </doc-container>`;
};
