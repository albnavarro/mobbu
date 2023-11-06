import { html, staticProps } from '../../../mobjs';

export const mobJs_props_inheritance = () => {
    return html`<html-content
        ${staticProps({ source: '/data/mobJs/propsInheritance.json' })}
    ></html-content>`;
};
