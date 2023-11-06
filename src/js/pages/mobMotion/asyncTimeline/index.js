import { html, staticProps } from '../../../mobjs';

export const mobMotion_async_timeline = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/asyncTimeline.json' })}
    ></html-content>`;
};
