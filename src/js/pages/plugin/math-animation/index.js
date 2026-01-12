import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { MathAnimation } from '@commonComponent/math-animation/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';

MobJs.useComponent([MathAnimation]);

/** @type {import('@mobJsType').PageAsync} */
export const mathAnimationRoute = async ({ props }) => {
    const { names } = /** @type{{names: string[]}} */ (props);
    if (names.length > 4) console.warn('math layout, max item excedded');

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#plugin-dragger',
        nextRoute: '#rosa-di-grandi',
        backRoute: '#plugin-overview',
    });

    const description = '<strong>Math:</strong> trigonometry based animation';
    updateAnimationDescription(description);

    return html`<div class="l-math">
        ${names
            .map((name) => {
                return html`<div class="l-math__item">
                    <math-animation
                        ${MobJs.staticProps({ name })}
                    ></math-animation>
                </div>`;
            })
            .join('')}
    </div>`;
};
