import { html, staticProps } from '../../../mobjs';

export const mobJs_remove = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/remove.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="/#mobJs_overview">mobjs</a> /
            <a href="/#mobJs_component">component</a> /
            <span>remove</span></doc-title-small
        >
        <links-mobjs slot="section-links"></links-mobjs>
        <doc-title slot="section-title">remove</doc-title>
    </doc-container>`;
};
