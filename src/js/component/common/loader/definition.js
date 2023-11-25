import { createComponent } from '../../../mobjs';
import { Loader } from './loader';

export const loaderDef = createComponent({
    name: 'mob-loader',
    component: Loader,
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
