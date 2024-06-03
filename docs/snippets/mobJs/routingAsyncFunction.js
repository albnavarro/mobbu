// './routes/my_route';

import { staticProps, html, useComponent } from '../mobjs';

/**
 * Import components definition used in wrapper.
 * ( object returned by createComponent() function )
 * It is necessary to load the dependencies before the application
 */
useComponent([MyComponent]);

export const my_route = async ({ params }) => {
    const { param1, param2 } = params;

    const response = await fetch('my_entry_point');

    if (!response.ok) return html`<div>my error</div>`;
    const routeData = await response.json();

    return html`<my-component ${staticProps({ data: routeData.data })}>
    </my-component>`;
};
