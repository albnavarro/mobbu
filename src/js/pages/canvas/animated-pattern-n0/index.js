import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { AnimatedPatternN0 } from '@pagesComponent/animated-pattern/n0/definition';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').Page} */
export const animatedPatternN0 = async () => {
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

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#async-timeline',
        nextRoute: '#animatedPatternN1',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        tag: 'main',
        content: {
            component: AnimatedPatternN0,
            modules: MobJs.staticProps(
                /** @type {import('@pagesComponent/animated-pattern/n0/type').AnimatedPatternN0['props']} */
                ({
                    background: bg,
                })
            ),
        },
    });
};
