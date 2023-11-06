import { html, staticProps } from '../../../mobjs';

export const mobJs_utils = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/utils.json' })}
    ></html-content>`;
};
