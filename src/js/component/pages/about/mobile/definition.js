//@ts-check

import { MobJs } from '@mobJs';
import { AboutMobileComponentFn } from './about';

export const AboutMobileComponent = MobJs.createComponent(
    /** @type{import('@mobJsType').CreateComponentParams<import ('./type').AboutMobile>} */
    ({
        tag: 'about-mobile-component',
        component: AboutMobileComponentFn,
        props: {
            block_1: {
                __value: {
                    titleTop: '',
                    titleBottom: '',
                },
                __type: 'any',
            },
            block_2: {
                __value: {
                    title: '',
                    copy: '',
                },
                __type: 'any',
            },
            block_3: {
                __value: {
                    title: '',
                    copy: '',
                },
                __type: 'any',
            },
            block_4: {
                __value: {
                    title: '',
                    items: [''],
                },
                __type: 'any',
            },
            svg: {
                __value: '',
                __type: String,
            },
        },
    })
);
