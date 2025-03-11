// './routes/my_route';

import { MobJs, html } from '../../../src/js/mobjs';

/**
 * Import components definition used in wrapper.
 * ( object returned by createComponent() function )
 * It is necessary to load the dependencies before the application
 */
MobJs.useComponent([MyComponent]);

export const my_route = ({ params, props }) => {
    const { param1, param2 } = params;
    const { myProps } = props;

    return html` <my-component ${MobJs.staticProps({ myrops: 'value' })}>
    </my-component>`;
};
