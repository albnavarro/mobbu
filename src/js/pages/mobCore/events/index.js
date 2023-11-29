import { html, staticProps } from '../../../mobjs';

export const mobCore_events = () => {
    return html` <doc-container>
        <html-content
            slot="docs"
            ${staticProps({
                source: '/data/mobCore/events.json',
                useMaxWidth: true,
            })}
        ></html-content>
        <doc-side slot="side"> Events </doc-side>
    </doc-container>`;
};
