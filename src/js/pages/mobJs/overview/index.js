import { html, staticProps } from '../../../mobjs';

export const mobJs_overview = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/overview.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs 
        <doc-title slot="section-title">mobJs</doc-title>
    </doc-container>`;
};
