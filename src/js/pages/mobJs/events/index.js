import { html, staticProps } from '../../../mobjs';

export const mobJs_events = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/events.json' })}
    ></html-content>`;
};
