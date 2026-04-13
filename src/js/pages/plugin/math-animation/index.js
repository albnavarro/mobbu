import { MathAnimation } from '@commonComponent/math-animation/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';

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

    return htmlObject({
        className: 'l-math',
        content: names.map((name) => {
            return htmlObject({
                component: MathAnimation,
                modules: MobJs.staticProps({ name }),
            });
        }),
    });
};
