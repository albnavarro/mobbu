import { html, staticProps } from '../../../mobjs';

export const mobJs_onMount = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/onMount.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            ><a href="/#mobJs_overview">mobjs</a> /
            <a href="/#mobJs_component">component</a> /
            <span>onMount</span></doc-title-small
        >
        <doc-title slot="section-title">onMount</doc-title>
    </doc-container>`;
};
