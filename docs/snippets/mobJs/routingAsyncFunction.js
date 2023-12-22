// './routes/my_route';

import { html, staticProps } from '../mobjs';

export const my_route = async () => {
    const response = await fetch('my_entry_point');

    if (!response.ok) return html`<div>my error</div>`;
    const routeData = await response.json();

    return html`<my-component ${staticProps({ data: routeData.data })}>
    </my-component>`;
};
