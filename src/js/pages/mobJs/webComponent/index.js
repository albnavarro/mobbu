import { html, staticProps } from '../../../mobjs';

export const mobJs_web_component = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/webComponent.json' })}
    ></html-content>`;
};
