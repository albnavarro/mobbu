import { html, staticProps } from '../../../mobjs';

export const mobJs_freezeProp = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/freezeProp.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>freezeProp</span></doc-title-small
        >
        <doc-title slot="section-title">freezeProp</doc-title>
    </doc-container>`;
};
