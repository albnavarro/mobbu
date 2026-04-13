// './routes/my_route';

import { MobJs, html, htmlObject } from '@mobJs';
import { MyComponent } from './bind-effect-1';

/**
 * Import components definition used in wrapper. ( object returned by createComponent() function ) It is necessary to
 * load the dependencies before the application.
 */
MobJs.useComponent([MyComponent]);

/** @type {import('@mobJsType').Page} */
export const my_route = async ({ params, props }) => {
    const { param1, param2 } = params;
    const { myProps } = props;

    const response = await fetch('my_entry_point');

    if (!response.ok) return html`<div>my error</div>`;
    const routeData = await response.json();

    return htmlObject({
        component: MyComponent,
        modules: MobJs.staticProps({ data: routeData.data }),
        content: 'my content',
    });
};
