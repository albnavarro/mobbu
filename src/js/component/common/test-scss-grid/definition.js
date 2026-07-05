import { MobJs } from '@mobJs';
import { TestScssGridFunction } from './test-scss-grid';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const TestScssGrid = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'test-scss-grid',
        component: TestScssGridFunction,
    })
);
