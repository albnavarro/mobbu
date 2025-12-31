import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';

MobJs.useComponent([]);

/** @type {import('@mobJsType').PageAsync} */
export const mathAnimationRoute = async ({ props }) => {
    const { types } = /** @type{{types: string[]}} */ (props);
    if (types.length > 4) console.warn('math layout, max item excedded');

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#plugin-dragger',
        nextRoute: '',
        backRoute: '#plugin-overview',
        color: 'black',
    });

    return html`<div class="l-math">
        ${types
            .map((type) => {
                return `<div class="l-math__item">${type}</div>`;
            })
            .join('')}
    </div>`;
};
