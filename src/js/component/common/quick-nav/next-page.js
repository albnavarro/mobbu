/**
 * @import {MobComponent} from "@mobJsType"
 * @import {QuickNav} from "./type"
 */

import { htmlObject } from '@mobJs';
import { MobTween } from '@mobMotion';

/** @type {MobComponent<QuickNav>} */
export const QuickNavFn = ({
    getProxi,
    bindEffect,
    addMethod,
    setRef,
    getRef,
    onMount,
    watch,
}) => {
    const proxi = getProxi();

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
        className: 'c-quick-nav-container',
        modules: bindEffect([
            {
                toggleClass: { active: () => proxi.active },
            },
        ]),
        content: [
            {
                tag: 'a',
                className: 'c-quick-nav is-prev',
                modules: [
                    setRef('previous'),
                    bindEffect({
                        toggleClass: { 'is-disable': () => !proxi.prevRoute },
                        toggleAttribute: {
                            href: () => {
                                const route = proxi.prevRoute;
                                return route.length > 0 ? route : null;
                            },
                        },
                    }),
                ],
            },
            {
                tag: 'a',
                className: 'c-quick-nav is-back',
                modules: [
                    setRef('back'),
                    bindEffect({
                        toggleClass: { 'is-disable': () => !proxi.backRoute },
                        toggleAttribute: {
                            href: () => {
                                const route = proxi.backRoute;
                                return route.length > 0 ? route : null;
                            },
                        },
                    }),
                ],
            },
            {
                tag: 'a',
                className: 'c-quick-nav is-next',
                modules: [
                    setRef('next'),
                    bindEffect({
                        toggleClass: { 'is-disable': () => !proxi.nextRoute },
                        toggleAttribute: {
                            href: () => {
                                const route = proxi.nextRoute;
                                return route && route.length > 0 ? route : null;
                            },
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
