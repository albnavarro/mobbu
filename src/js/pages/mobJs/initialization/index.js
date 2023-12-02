import { html, staticProps } from '../../../mobjs';

export const mobJs_initialization = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/initialization.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title slot="section-title">Initialization</doc-title>
    </doc-container>`;
};
