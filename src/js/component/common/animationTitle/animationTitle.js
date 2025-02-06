//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { AnimationTitle } from './type';
 **/

import { mobCore } from '../../../mobCore';

/** @type {MobComponent<AnimationTitle>} */
export const AnimationTitleFn = ({
    html,
    onMount,
    bindText,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        mobCore.useFrame(() => {
            proxi.isMounted = true;
        });
    });

    return html`<div
        class="c-animation-title"
        ${bindEffect({
            bind: ['align'],
            toggleClass: {
                'is-left': () => proxi.align === 'left',
                'is-right': () => proxi.align === 'right',
            },
        })}
    >
        <h4
            ${bindEffect({
                bind: ['color', 'isMounted'],
                toggleClass: {
                    'is-white': () => proxi.color === 'white',
                    'is-black': () => proxi.color === 'black',
                    visible: () => proxi.isMounted,
                },
            })}
        >
            ${bindText`${'title'}`}
        </h4>
    </div>`;
};
