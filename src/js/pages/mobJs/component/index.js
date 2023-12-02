import { html, staticProps } from '../../../mobjs';

export const mobJs_component = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/component.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title slot="section-title">Component</doc-title>
    </doc-container>`;
};
