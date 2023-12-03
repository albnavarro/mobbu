import { html, staticProps } from '../../../mobjs';

export const mobJs_bindProps = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/bindProps.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>bindProps</span></doc-title-small
        >
        <doc-title slot="section-title">bindProps</doc-title>
    </doc-container>`;
};
