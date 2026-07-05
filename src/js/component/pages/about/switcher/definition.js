import { MobJs } from '@mobJs';
import { mqStore } from '@stores/mq';
import { AboutSwitcherFunction } from './about-switcher';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AboutSwitcher = MobJs.createComponent(
    /** @type{CreateComponentParams<import ('./type').AboutSwitcher>} */
    ({
        tag: 'about-switcher',
        component: AboutSwitcherFunction,
        bindStore: mqStore,
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
            mobileSvg: {
                __value: '',
                __type: String,
            },
            tabletSvg: {
                __value: '',
                __type: String,
            },
        },
    })
);
