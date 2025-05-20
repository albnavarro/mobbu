import { getTrinangle } from '@componentLibs/utils/get-triangle';
import { html, MobJs } from '@mobJs';
import { sectionPinAnimation } from './animation/pin-animation';
import { navigationStore } from '@layoutComponent/navigation/store/nav-store';

/**
 * @param {string} tag
 * @returns {string}
 */
const shouldUseTrinagle = (tag) => {
    return tag === `h1` ? getTrinangle() : '';
};

/**
 * @param {string} index
 * @returns {string}
 */
const getIndex = (index) => {
    return index.length > 0
        ? html`<span class="title-index">${index}</span>`
        : ``;
};

let currentZindex = 1;

MobJs.beforeRouteChange(() => {
    currentZindex = 1;
});

/** @type {import('@mobJsType').MobComponent<import('./type').Title>} */
export const TitleFn = ({ onMount, bindStore, bindEffect, getProxi }) => {
    bindStore([navigationStore]);
    const proxi = getProxi();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};

    const colorClass = proxi.color === 'inherit' ? '' : `is-${proxi.color}`;
    const boldClass = proxi.isBold ? `is-bold` : '';
    const isSectionClass = proxi.isSection ? `is-section` : '';
    const useStickyClass = proxi.useSticky ? `use-sticky` : '';

    /**
     * Each section must have a z-index grater than previous for pin.
     */
    if (proxi.isSection) currentZindex++;

    onMount(({ element }) => {
        const unsubscribeRouteChange = MobJs.afterRouteChange(async () => {
            await MobJs.tick();

            if (proxi.isSection) {
                const pinMethods = sectionPinAnimation({
                    element,
                });

                destroy = pinMethods.destroy;
            }
        });

        return () => {
            unsubscribeRouteChange();
            destroy();
        };
    });

    return html`<${proxi.tag} class="${colorClass} ${boldClass} ${isSectionClass} ${useStickyClass}"
            style="z-index:${proxi.isSection ? currentZindex : 0};"
            ${bindEffect({
                toggleClass: {
                    hide: () => proxi.isSection && proxi.navigationIsOpen,
                },
            })}
        >
            ${getIndex(proxi.index)}
            <span class="triangle-left">${shouldUseTrinagle(proxi.tag)}</span>
            <span class="triangle-right">${shouldUseTrinagle(proxi.tag)}</span>
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${proxi.tag}>`;
};
