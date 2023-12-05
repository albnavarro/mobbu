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
            ><a href="/#mobJs_overview">mobjs</a> /
            <a href="/#mobJs_component">component</a> /
            <span>delegateEvents</span></doc-title-small
        >
        <links-mobjs slot="section-links"></links-mobjs>
        <doc-title slot="section-title">delegateEvents</doc-title>
    </doc-container>`;
};
