import { html, staticProps } from '../../../mobjs';

export const mobJs_overview = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/overview.json' })}
    ></html-content>`;
};
