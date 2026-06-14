/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject } from '@mobJs';

/** @type {MobComponent<import('./type').About>} */
export const AboutMobileComponentFn = ({ getSelfProxi }) => {
    const proxi = getSelfProxi();
    console.log(proxi.block_1.titleTop);

    const sectionOne = {
        tag: 'section',
        content: [
            {
                tag: 'h1',
                content: proxi.block_1.titleTop,
            },
            {
                tag: 'h2',
                content: proxi.block_1.titleBottom,
            },
        ],
    };

    const sectionTwo = {
        tag: 'section',
        content: [
            {
                tag: 'h2',
                content: proxi.block_2.title,
            },
            {
                tag: 'p',
                content: proxi.block_2.copy,
            },
        ],
    };

    const sectionThree = {
        tag: 'section',
        content: [
            {
                tag: 'h2',
                content: proxi.block_3.title,
            },
            {
                tag: 'p',
                content: proxi.block_3.copy,
            },
        ],
    };

    const sectionFour = {
        tag: 'section',
        content: [
            {
                tag: 'h2',
                content: proxi.block_4.title,
            },
            {
                tag: 'ul',
                content: proxi.block_4.items.map((item) => {
                    return htmlObject({
                        tag: 'li',
                        content: item,
                    });
                }),
            },
        ],
    };

    return htmlObject({
        className: 'l-about-mobile',
        content: [sectionOne, sectionTwo, sectionThree, sectionFour],
    });
};
