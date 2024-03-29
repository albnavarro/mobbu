import { createComponent } from '../../../mobjs';
import { HomeComponent } from './home';

export const homePageComponentDef = createComponent({
    name: 'home-component',
    component: HomeComponent,
    exportState: ['svg'],
    state: {
        svg: () => ({
            value: '',
            type: String,
        }),
    },
});
