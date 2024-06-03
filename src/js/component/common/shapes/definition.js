import { createComponent } from '../../../mobjs';
import { FooterShapeV1Fn } from './footerShapeV1';

export const FooterShapeV1 = createComponent({
    name: 'footer-shape-v1',
    component: FooterShapeV1Fn,
    exportState: ['position', 'svg'],
    state: {
        position: () => ({
            value: 'left',
            type: String,
        }),
        svg: () => ({
            value: '',
            type: String,
        }),
    },
});
