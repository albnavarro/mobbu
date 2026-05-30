/**
 * @import {MobComponent} from "@mobJsType"
 * @import {QuickNav} from "./type"
 */

import { htmlObject, MobJs } from '@mobJs';
import { MobTween } from '@mobMotion';

/** @type {MobComponent<QuickNav>} */
export const QuickNavFn = ({
    getSelfProxi,
    bindEffect,
    addMethod,
    setRef,
    getRef,
    onMount,
    watch,
    delegateEvents,
}) => {
    const proxi = getSelfProxi();

    addMethod('update', (prop, value) => {
        proxi[prop] = value;
    });

    let spring = MobTween.createTimeTween({
        data: { y: 0, yContainer: 100 },
        duration: 300,
        ease: 'easeOutQuad',
    });

    watch(
        () => proxi.currentLabelId,
        (currentId) => {
            if (currentId === -1) {
                spring.goTo({ yContainer: 100 });
                return;
            }

            spring.goTo({ y: (100 / 3) * -currentId, yContainer: 0 });
        }
    );

    onMount(({ element }) => {
        let { back, next, previous, labelList, labels } = getRef();

        spring.subscribe(({ y, yContainer }) => {
            labelList.style.transform = `translateY(${y}%)`;
            labels.style.transform = `translateY(${yContainer}%)`;
        });

        element.addEventListener('mouseleave', () => {
            proxi.currentLabelId = -1;
        });

        previous.addEventListener('mouseenter', () => {
            proxi.currentLabelId = 0;
        });

        back.addEventListener('mouseenter', () => {
            proxi.currentLabelId = 1;
        });

        next.addEventListener('mouseenter', () => {
            proxi.currentLabelId = 2;
        });

        return () => {
            spring.destroy();

            // @ts-ignore
            spring = null;

            // @ts-ignore
            previous = null;

            // @ts-ignore
            back = null;

            // @ts-ignore
            next = null;

            // @ts-ignore
            labelList = null;

            // @ts-ignore
            labels = null;
        };
    });

    return htmlObject({
        tag: 'nav',
        className: 'c-quick-nav-container',
        attributes: { 'aria-label': 'Showcase navigation' },
        modules: bindEffect([
            {
                toggleClass: { active: () => proxi.active },
                toggleAttribute: { inert: () => !proxi.active },
            },
        ]),
        content: [
            {
                tag: 'button',
                className: 'c-quick-nav is-prev',
                attributes: {
                    type: 'button',
                    role: 'link',
                    'aria-label': 'previous showcase item',
                },
                modules: [
                    setRef('previous'),
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url: proxi.prevRoute });
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () =>
                                !proxi.prevRoute || proxi.prevRoute.length === 0
                                    ? true
                                    : null,
                        },
                    }),
                ],
            },
            {
                tag: 'button',
                className: 'c-quick-nav is-back',
                attributes: {
                    type: 'button',
                    role: 'link',
                    'aria-label': 'back to showcase list',
                },
                modules: [
                    setRef('back'),
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url: proxi.backRoute });
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () =>
                                !proxi.backRoute || proxi.backRoute.length === 0
                                    ? true
                                    : null,
                        },
                    }),
                ],
            },
            {
                tag: 'button',
                className: 'c-quick-nav is-next',
                attributes: {
                    type: 'button',
                    role: 'link',
                    'aria-label': 'next showcase item',
                },
                modules: [
                    setRef('next'),
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url: proxi.nextRoute });
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () =>
                                !proxi.nextRoute || proxi.nextRoute.length === 0
                                    ? true
                                    : null,
                        },
                    }),
                ],
            },
            {
                className: 'quick-nav-labels',
                content: {
                    className: 'labels',
                    modules: setRef('labels'),
                    content: {
                        className: 'labels-container',
                        modules: setRef('labelList'),
                        content: [
                            {
                                tag: 'span',
                                content: 'previous item',
                            },
                            {
                                tag: 'span',
                                content: 'all items',
                            },
                            {
                                tag: 'span',
                                content: 'next item',
                            },
                        ],
                    },
                },
            },
        ],
    });
};
