import { html, staticProps } from '../../../mobjs';

export const mobMotion_overview = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobMotion/overview.json' })}
    ></html-content>`;
};
