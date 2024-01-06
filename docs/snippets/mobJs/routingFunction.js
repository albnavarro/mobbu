// './routes/my_route';

import { html, staticProps } from '../mobjs';

export const my_route = ({ params }) => {
    const { param1, param2 } = params;

    return html` <my-component ${staticProps({ myrops: 'value' })}>
    </my-component>`;
};
