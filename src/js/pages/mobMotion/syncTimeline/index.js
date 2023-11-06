import { html, staticProps } from '../../../mobjs';

export const mobMotion_sync_timeline = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/syncTimeline.json' })}
    ></html-content>`;
};
