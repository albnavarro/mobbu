// './routes/my_route';

import { staticProps, html, useComponent } from '../../../src/js/mobjs';

/**
 * Import components definition used in wrapper.
 * ( object returned by createComponent() function )
 * It is necessary to load the dependencies before the application
 */
useComponent([MyComponent]);

export const my_route = ({ params, props }) => {
    const { param1, param2 } = params;
    const { myProps } = props;

    return html` <my-component ${staticProps({ myrops: 'value' })}>
    </my-component>`;
};
