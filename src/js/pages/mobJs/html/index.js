import { html, staticProps } from '../../../mobjs';

export const mobJs_html = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/html.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>html</span></doc-title-small
        >
        <doc-title slot="section-title">HTML</doc-title>
    </doc-container>`;
};
