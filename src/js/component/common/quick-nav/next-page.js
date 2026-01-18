/**
 * @import {MobComponent} from "@mobJsType"
 * @import {QuickNav} from "./type"
 */

import { html } from '@mobJs';
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

    return html`<div
        class="c-quick-nav-container"
        ${bindEffect([
            {
                toggleClass: { active: () => proxi.active },
            },
        ])}
    >
        <a
            class="c-quick-nav c-quick-nav--prev"
            ${setRef('previous')}
            ${bindEffect({
                toggleClass: { 'is-disable': () => !proxi.prevRoute },
                toggleAttribute: {
                    href: () => {
                        const route = proxi.prevRoute;
                        return route.length > 0 ? route : null;
                    },
                },
            })}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--back"
            ${setRef('back')}
            ${bindEffect({
                toggleClass: { 'is-disable': () => !proxi.backRoute },
                toggleAttribute: {
                    href: () => {
                        const route = proxi.backRoute;
                        return route.length > 0 ? route : null;
                    },
                },
            })}
        >
        </a>
        <a
            class="c-quick-nav c-quick-nav--next"
            ${setRef('next')}
            ${bindEffect({
                toggleClass: { 'is-disable': () => !proxi.nextRoute },
                toggleAttribute: {
                    href: () => {
                        const route = proxi.nextRoute;
                        return route && route.length > 0 ? route : null;
                    },
                },
            })}
        >
        </a>
        <div class="c-quick-nav__label-container">
            <div class="c-quick-nav__label" ${setRef('labels')}>
                <div
                    class="c-quick-nav__label__container"
                    ${setRef('labelList')}
                >
                    <span class="c-quick-nav__label__item">previous item</span>
                    <span class="c-quick-nav__label__item">all items</span>
                    <span class="c-quick-nav__label__item">next item</span>
                </div>
            </div>
        </div>
    </div>`;
};
