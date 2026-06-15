/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject } from '@mobJs';

/** @type {MobComponent<import('./type').About>} */
export const AboutMobileComponentFn = ({ getSelfProxi }) => {
    const proxi = getSelfProxi();

    const sectionOne = {
        tag: 'section',
        className: 'section-one',
        content: [
            {
                content: proxi.svg,
            },
            {
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
            },
        ],
    };

    const sectionTwo = {
        tag: 'section',
        className: 'section-two',
        content: [
            {
                tag: 'h3',
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
        className: 'section-three',
        content: [
            {
                tag: 'h3',
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
        className: 'section-four',
        content: [
            {
                tag: 'h3',
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
