import { html, staticProps } from '../../../mobjs';

export const mobJs_delegateEvents = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobJs/delegateEvents.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-title-small slot="section-title-small"
            >mobjs / <span>delegateEvents</span></doc-title-small
        >
        <doc-title slot="section-title">delegateEvents</doc-title>
    </doc-container>`;
};
