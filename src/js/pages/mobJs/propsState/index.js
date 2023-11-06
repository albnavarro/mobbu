import { html, staticProps } from '../../../mobjs';

export const mobJs_props_state = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/stateProps.json' })}
    ></html-content>`;
};
