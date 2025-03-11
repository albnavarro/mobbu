//@ts-check
import { MobJs } from '../../../mobjs';
import { TestScssGridFn } from './TestScssGrid';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const TestScssGrid = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'test-scss-grid',
        component: TestScssGridFn,
    })
);
