import { html, staticProps } from '../../../mobjs';

export const mobMotion_create_stagger = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/createStagger.json' })}
    ></html-content>`;
};
