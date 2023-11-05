import { html, staticProps } from '../../../mobjs';

export const mobJs_overview = () => {
    return html`<html-content
        ${staticProps({ source: '/data/overview.json' })}
    ></html-content>`;
};
