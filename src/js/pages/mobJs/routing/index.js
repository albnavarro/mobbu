import { html, staticProps } from '../../../mobjs';

export const mobJs_routing = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/routing.json' })}
    ></html-content>`;
};
