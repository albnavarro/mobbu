import { html, staticProps } from '../../../mobjs';

export const mobJs_runtime = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/runtime.json' })}
    ></html-content>`;
};
