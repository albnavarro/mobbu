import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').Dragger>} */
export const DraggerFn = ({ getProxi, setRef, getRef, onMount }) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        const { child } = getRef();
        console.log(element, child);
    });

    return html`<div class="c-dragger ${proxi.rootClass}">
        <mobjs-slot name="root-slot"></mobjs-slot>
        <div class="c-dragger__wrapper ${proxi.childClass}" ${setRef('child')}>
            <mobjs-slot name="child-slot"></mobjs-slot>
        </div>
    </div>`;
};
