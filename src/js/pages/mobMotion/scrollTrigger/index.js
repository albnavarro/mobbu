import { html, staticProps } from '../../../mobjs';

export const mobMotion_scrolltrigger = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/scrollTrigger.json' })}
    ></html-content>`;
};
