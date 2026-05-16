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
            className: {
                __value: '',
                __type: String,
            },
            url: {
                __value: '',
                __type: String,
            },
        },
        state: {
            source: {
                __value: /* HTML */ `<span class="loading">
                    loading image ...
                </span>`,
                __type: String,
            },
        },
    })
);
