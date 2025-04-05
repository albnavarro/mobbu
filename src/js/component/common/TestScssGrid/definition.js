//@ts-check
import { MobJs } from '../../../mob/mobjs';
import { TestScssGridFn } from './TestScssGrid';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const TestScssGrid = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'test-scss-grid',
        component: TestScssGridFn,
    })
);
