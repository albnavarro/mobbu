import { MobJs } from '@mobJs';
import { DocSvgFn } from './doc-svg';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DocSvg = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DocSvg>} */
    ({
        tag: 'doc-svg',
        component: DocSvgFn,
        props: {
            className: () => ({
                value: '',
                type: String,
            }),
            url: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            source: () => ({
                value: /* HTML */ `<span class="loading">
                    loading image ...
                </span>`,
                type: String,
            }),
        },
    })
);
