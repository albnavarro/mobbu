import { createComponent } from '../../../mobjs';
import { Loader } from './loader';

export const loaderDef = createComponent({
    name: 'mob-loader',
    component: Loader,
    exportState: ['shouldRemove'],
    state: {
        shouldRemove: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
