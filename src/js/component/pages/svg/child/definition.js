//@ts-check

import { createComponent } from '../../../../mobjs';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { SvgChildFn } from './child';

export const svgChild = createComponent({
    name: 'svg-child',
    component: SvgChildFn,
    exportState: ['svg', 'star'],
    state: {
        star: () => ({
            value: '',
            type: String,
        }),
        svg: () => ({
            value: '',
            type: String,
        }),
    },
    child: [OnlyDesktop],
});
