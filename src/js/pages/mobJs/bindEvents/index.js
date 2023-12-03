import { html, staticProps } from '../../../mobjs';

export const mobJs_bindEvents = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/bindEvents.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>bindEvents</span></doc-title-small
        >
        <doc-title slot="section-title">bindEvents</doc-title>
    </doc-container>`;
};
