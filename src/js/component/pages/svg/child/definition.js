import { createComponent } from '../../../../mobjs';
import { OnlyDesktop } from '../../../common/onlyDesktop/definition';
import { SvgChild } from './child';

export const svgChild = createComponent({
    name: 'svg-child',
    component: SvgChild,
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
