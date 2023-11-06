import { html, staticProps } from '../../../mobjs';

export const mobMotion_parallax = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/parallax.json' })}
    ></html-content>`;
};
