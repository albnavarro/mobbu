import { MobJs } from '@mobJs';
import { DocSvgFunction } from './doc-svg';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DocSvg = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DocSvg>} */
    ({
        tag: 'doc-svg',
        component: DocSvgFunction,
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
