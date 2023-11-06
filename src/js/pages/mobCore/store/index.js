import { html, staticProps } from '../../../mobjs';

export const mobCore_store = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobCore/store.json' })}
    ></html-content>`;
};
