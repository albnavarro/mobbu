import { createComponent } from '../../../mobjs';
import { AnimationTitle } from './animationTitle';

export const animationTitleDef = createComponent({
    name: 'animation-title',
    component: AnimationTitle,
    exportState: ['title'],
    state: {
        title: () => ({
            value: '',
            type: String,
        }),
    },
});
