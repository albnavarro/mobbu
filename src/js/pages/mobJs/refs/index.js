import { html, staticProps } from '../../../mobjs';

export const mobJs_refs = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/refs.json' })}
    ></html-content>`;
};
