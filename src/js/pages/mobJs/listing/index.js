import { html, staticProps } from '../../../mobjs';

export const mobJs_listing = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/listing.json' })}
    ></html-content>`;
};
