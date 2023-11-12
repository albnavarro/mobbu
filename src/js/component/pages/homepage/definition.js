import { createComponent } from '../../../mobjs';
import { HomeContent } from './homeContent';
import { HomeLogo } from './logo';

export const homePageLogoDef = createComponent({
    name: 'home-logo',
    component: HomeLogo,
});

export const homePageComponentDef = createComponent({
    name: 'home-content',
    component: HomeContent,
});
