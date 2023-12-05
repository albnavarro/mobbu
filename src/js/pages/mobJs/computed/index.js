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
            ><a href="/#mobJs_overview">mobjs</a> /
            <a href="/#mobJs_component">component</a> /
            <span>computed</span></doc-title-small
        >
        <links-mobjs slot="section-links"></links-mobjs>
        <doc-title slot="section-title">computed</doc-title>
    </doc-container>`;
};
