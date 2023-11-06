import { html, staticProps } from '../../../mobjs';

export const mobJs_lifecycle = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/lifecycle.json' })}
    ></html-content>`;
};
