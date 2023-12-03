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
        <doc-title-small slot="section-title-small"
            >mobjs / <span>initialization</span></doc-title-small
        >
        <doc-title slot="section-title">Initialization</doc-title>
    </doc-container>`;
};
