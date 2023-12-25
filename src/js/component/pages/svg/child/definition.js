import { createComponent } from '../../../../mobjs';
import { SvgChild } from './child';

export const svgChild = createComponent({
    name: 'svg-child',
    component: SvgChild,
    exportState: ['svg'],
    state: {
        svg: () => ({
            value: '',
            type: String,
        }),
    },
});
