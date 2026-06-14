import { MathAnimation } from '@commonComponent/math-animation/definition';
import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').PageAsync} */
export const mathAnimationRoute = async ({ props }) => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    if (MobMotionCore.mq('max', 'medium')) {
        return htmlObject({
            content: [
                {
                    className: 'l-background-shape',
                    content: bg,
                },
                {
                    component: OnlyTablet,
                },
            ],
        });
    }

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
        tag: 'main',
        content: {
            className: 'l-math',
            content: [
                {
                    component: H1Standalone,
                    modules: MobJs.staticProps(
                        /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                            text: 'Math animation',
                        })
                    ),
                },
                ...names.map((name) => {
                    return htmlObject({
                        component: MathAnimation,
                        modules: MobJs.staticProps({ name }),
                    });
                }),
            ],
        },
    });
};
