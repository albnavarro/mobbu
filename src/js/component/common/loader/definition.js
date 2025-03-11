//@ts-check

import { MobJs } from '../../../mobjs';
import { LoaderFn } from './loader';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const Loader = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').Loader>} */
    ({
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
                    return ['center-viewport', 'center-component'].includes(
                        val
                    );
                },
            }),
        },
    })
);
