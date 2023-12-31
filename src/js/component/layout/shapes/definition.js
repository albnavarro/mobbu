import { createComponent } from '../../../mobjs';
import { FooterShaperV1 } from './footerShapeV1';

export const footerShaperV1Def = createComponent({
    name: 'footer-shape-v1',
    component: FooterShaperV1,
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
