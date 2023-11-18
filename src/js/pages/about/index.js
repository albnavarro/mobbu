import { html, staticProps } from '../../mobjs';

export const about = () => {
    return html`<html-content
        ${staticProps({ source: '/data/about.json' })}
    ></html-content>`;
};
