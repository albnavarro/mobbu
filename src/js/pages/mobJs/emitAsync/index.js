import { html, staticProps } from '../../../mobjs';

export const mobJs_emitAsync = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/emitAsync.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>emitAsync</span></doc-title-small
        >
        <doc-title slot="section-title">emitAsync</doc-title>
    </doc-container>`;
};
