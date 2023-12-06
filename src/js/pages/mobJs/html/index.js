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
            ><a href="/#mobJs_overview">mobjs</a> /
            <a href="/#mobJs_component">component</a> /
            <span>html</span></doc-title-small
        >
        <links-mobjs
            ${staticProps({ section: 'mobjs' })}
            slot="section-links"
        ></links-mobjs>
        <doc-title slot="section-title">HTML</doc-title>
    </doc-container>`;
};
