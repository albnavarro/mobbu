import { createComponent } from '../../../mobjs';
import { HomeComponent } from './home';

export const homePageComponentDef = createComponent({
    name: 'home-component',
    component: HomeComponent,
    exportState: ['logo', 'sideShape'],
    state: {
        logo: () => ({
            value: '',
            type: String,
        }),
        sideShape: () => ({
            value: '',
            type: String,
        }),
    },
});
