import { html, staticProps } from '../../../mobjs';

export const mobJs_emit = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/emit.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>emit</span></doc-title-small
        >
        <doc-title slot="section-title">emit</doc-title>
    </doc-container>`;
};
