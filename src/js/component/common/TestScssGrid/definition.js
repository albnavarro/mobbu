//@ts-check
import { MobJs } from '@mobJs';
import { TestScssGridFn } from './TestScssGrid';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const TestScssGrid = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'test-scss-grid',
        component: TestScssGridFn,
    })
);
