// './routes/my_route';

import { html, staticProps } from '../mobjs';

export const my_route = () => {
    return html` <my-component ${staticProps({ myrops: 'value' })}>
    </my-component>`;
};
