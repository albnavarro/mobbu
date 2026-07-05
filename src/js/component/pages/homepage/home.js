//@ts-check

/**
 * @import {MobComponent} from '@mobJsType'
 * @import {HomeComponent} from './type'
 */

import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { simpleIntroAnimation } from '@componentLibs/animation/simple-intro';
import { htmlObject, MobJs } from '@mobJs';

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
export const HomeComponentFunction = ({
    onMount,
    getSelfProxi,
    invalidate,
    getBoundedProxi,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    const { svg } = proxi;

    onMount(({ element }) => {
        const svg_group = [...element.querySelectorAll('svg')];

        const { destroy, playIntro, playSvg } = simpleIntroAnimation({
            refs: /** @type {HTMLOrSVGElement[]} */ (svg_group),
        });

        setTimeout(() => {
            playAnimation({ playIntro, playSvg });
        }, 500);

        /**
         * Prevent component is visible when route is cloned during page-transition.
         */
        const unsubscribeRouteChange = MobJs.beforeRouteChange(() => {
            element.style.display = 'none';
            unsubscribeRouteChange();
        });

        return () => {
            destroy();
        };
    });

    return htmlObject({
        tag: 'main',
        attributes: { tabindex: '-1' },
        className: 'l-index',
        content: [
            {
                className: 'text-container',
                content: [
                    {
                        tag: 'span',
                        className: 'mask',
                    },
                    {
                        content: invalidate({
                            observe: () => boundedProxi.fromTablet,
                            render: () => {
                                return boundedProxi.fromTablet
                                    ? htmlObject({
                                          component: H1Standalone,
                                          modules: MobJs.staticProps(
                                              /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                                                  text: 'MobProject v1.0',
                                              })
                                          ),
                                      })
                                    : htmlObject({});
                            },
                        }),
                    },
                ],
            },
            {
                className: 'logo',
                content: svg.map((item) => {
                    return item;
                }),
            },
        ],
    });
};
