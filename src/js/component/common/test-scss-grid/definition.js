import { MobJs } from '@mobJs';
import { TestScssGridFn } from './test-scss-grid';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const TestScssGrid = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        name: 'test-scss-grid',
        component: TestScssGridFn,
    })
);
