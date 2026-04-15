//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {HomeComponent} from "./type"
 */

import { Paragraph } from '@commonComponent/typography/paragraph/definition';
import { Title } from '@commonComponent/typography/titles/definition';
import { simpleIntroAnimation } from '@componentLibs/animation/simple-intro';
import { htmlObject } from '@mobJs';
import { htmlObjectNext } from 'src/js/mob/mob-js/parse/steps/from-object-next';

/**
 * @param {object} params
 * @param {() => Promise<void>} params.playIntro
 * @param {() => void} params.playSvg
 * @returns {Promise<void>}
 */
const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/** @type {MobComponent<HomeComponent>} */
export const HomeComponentFn = ({
    onMount,
    getProxi,
    bindEffect,
    delegateEvents,
    invalidate,
}) => {
    const proxi = getProxi();
    const { svg } = proxi;

    onMount(({ element }) => {
        const svg_group = [...element.querySelectorAll('svg')];

        const { destroy, playIntro, playSvg } = simpleIntroAnimation({
            refs: /** @type {HTMLOrSVGElement[]} */ (svg_group),
        });

        setTimeout(() => {
            playAnimation({ playIntro, playSvg });
        }, 500);

        return () => {
            destroy();
        };
    });

    const testRender = htmlObjectNext({
        tag: 'section',
        className: 'section-class',
        style: 'background:#000;',
        attributes: { id: 2, name: 'my-name' },
        modules: [
            bindEffect({
                toggleClass: {
                    active: () => proxi.isMounted,
                },
            }),
            delegateEvents({
                click: () => {
                    console.log('click');
                },
            }),
        ],
        content: [
            {
                tag: 'ul',
                content: invalidate({
                    observe: () => proxi.isMounted,
                    render: () => {
                        return htmlObjectNext({
                            component: Title,
                            content: 'my title',
                        });
                    },
                }),
            },
            {
                component: Paragraph,
                className: ['my-paragrph-class', 'my-other-class'],
                content: 'lorem ipsum',
            },
        ],
    });

    console.log(testRender);

    return htmlObject({
        className: 'l-index',
        content: {
            className: 'logo',
            content: svg.map((item) => {
                return item;
            }),
        },
    });
};
