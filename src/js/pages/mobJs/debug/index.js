import { html, staticProps } from '../../../mobjs';

export const mobJs_debug = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/debug.json' })}
    ></html-content>`;
};
