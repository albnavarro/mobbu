//@ts-check

import { createComponent } from '../../../mobjs';
import { LoaderFn } from './loader';

export const Loader = createComponent({
    name: 'mob-loader',
    component: LoaderFn,
    exportState: ['position', 'shouldRemove'],
    state: {
        shouldRemove: () => ({
            value: false,
            type: Boolean,
        }),
        position: () => ({
            value: 'center-viewport',
            type: String,
            validate: (val) => {
                return ['center-viewport', 'center-component'].includes(val);
            },
        }),
    },
});
