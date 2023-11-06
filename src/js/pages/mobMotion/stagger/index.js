import { html, staticProps } from '../../../mobjs';

export const mobMotion_stagger = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/stagger.json' })}
    ></html-content>`;
};
