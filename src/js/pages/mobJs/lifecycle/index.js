import { html, staticProps } from '../../../mobjs';

export const mobJs_lifecycle = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/lifecycle.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title slot="section-title">Component</doc-title>
    </doc-container>`;
};
