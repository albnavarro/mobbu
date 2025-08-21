import { getTrinangle } from '@componentLibs/utils/get-triangle';
import { html, MobJs } from '@mobJs';
import { sectionPinAnimation } from './animation/pin-animation';
import { MobCore } from '@mobCore';

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
export const TitleFn = ({ onMount, bindEffect, getProxi }) => {
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
        /**
         * Added pin only when page is stable.
         */
        const unsubscribeAfterRouteChange = proxi.useSticky
            ? MobJs.afterRouteChange(async () => {
                  await MobJs.tick();

                  const pinMethods = sectionPinAnimation({
                      element,
                  });

                  destroy = pinMethods.destroy;
              })
            : () => {};

        /**
         * Move sticky title before route change
         */
        const unsubscribeBeforeRouteChange = MobJs.beforeRouteChange(() => {
            proxi.hideBeforeRouteChange = true;
        });

        return () => {
            unsubscribeAfterRouteChange();

            /**
             * Destroy after some frame. If title is pinned has time start animate out.
             */
            MobCore.useFrameIndex(() => {
                unsubscribeBeforeRouteChange();
                destroy();
                destroy = () => {};
            }, 20);
        };
    });

    return html`<${proxi.tag} class="${colorClass} ${boldClass} ${isSectionClass} ${useStickyClass}"
            style="z-index:${proxi.isSection ? currentZindex : 0};"
            ${bindEffect({
                toggleClass: {
                    hide: () =>
                        (proxi.isSection && proxi.navigationIsOpen) ||
                        proxi.hideBeforeRouteChange,
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
