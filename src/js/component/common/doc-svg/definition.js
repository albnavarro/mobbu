import { html, MobJs } from '@mobJs';
import { DocSvgFn } from './doc-svg';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DocSvg = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DocSvg>} */
    ({
        tag: 'doc-svg',
        component: DocSvgFn,
        exportState: ['url', 'className'],
        state: {
            source: () => ({
                value: html`<span class="c-doc-svg__loading">
                    loading image ...
                </span>`,
                type: String,
            }),
            className: () => ({
                value: '',
                type: String,
            }),
            url: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
