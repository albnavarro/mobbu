import { html, staticProps } from '../../../mobjs';

export const mobJs_unBind = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/unBind.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>unBind</span></doc-title-small
        >
        <doc-title slot="section-title">unBind</doc-title>
    </doc-container>`;
};
