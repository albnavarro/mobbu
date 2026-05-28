import { MobJs } from '@mobJs';
import { SearchCtaFn } from './search-cta';

export const SearchCta = MobJs.createComponent({
    tag: 'search-cta',
    component: SearchCtaFn,
    state: {
        expanded: {
            __value: false,
            __type: Boolean,
        },
    },
});
