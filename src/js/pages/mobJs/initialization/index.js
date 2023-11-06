import { html, staticProps } from '../../../mobjs';

export const mobJs_initialization = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/initialization.json' })}
    ></html-content>`;
};
