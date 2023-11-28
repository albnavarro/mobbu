import { html, staticProps } from '../../../mobjs';

export const mobCore_events = () => {
    return html`<html-content
        ${staticProps({
            source: '/data/mobCore/events.json',
            useMaxWidth: true,
        })}
    ></html-content>`;
};
