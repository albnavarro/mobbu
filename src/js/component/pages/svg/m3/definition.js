import { createComponent } from '../../../../mobjs';
import { M3 } from './m3';

export const letteringM3 = createComponent({
    name: 'lettering-m3',
    component: M3,
    exportState: ['svg'],
    state: {
        svg: () => ({
            value: '',
            type: String,
        }),
    },
});
