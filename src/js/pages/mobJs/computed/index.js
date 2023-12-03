import { html, staticProps } from '../../../mobjs';

export const mobJs_computed = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/computed.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>computed</span></doc-title-small
        >
        <doc-title slot="section-title">computed</doc-title>
    </doc-container>`;
};
