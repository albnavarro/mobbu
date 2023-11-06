import { html, staticProps } from '../../../mobjs';

export const mobJs_slot = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/slot.json' })}
    ></html-content>`;
};
