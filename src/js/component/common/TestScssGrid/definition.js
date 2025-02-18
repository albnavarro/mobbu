//@ts-check
import { createComponent } from '../../../mobjs';
import { TestScssGridFn } from './TestScssGrid';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const TestScssGrid = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'test-scss-grid',
        component: TestScssGridFn,
    })
);
