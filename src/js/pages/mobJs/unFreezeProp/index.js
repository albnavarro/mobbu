import { html, staticProps } from '../../../mobjs';

export const mobJs_unFreezeProp = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/unFreezeProp.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>unFreezeProp</span></doc-title-small
        >
        <doc-title slot="section-title">unFreezeProp</doc-title>
    </doc-container>`;
};
