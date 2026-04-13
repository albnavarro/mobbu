import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { ScrollerN0 } from '@pagesComponent/scroller/n0/definition';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').Page} */
export const scrollerN0 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#animatedPatternN1',
        nextRoute: '',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        content: {
            component: ScrollerN0,
            modules: MobJs.staticProps(
                /** @type {import('@pagesComponent/animated-pattern/n0/type').AnimatedPatternN0['props']} */
                ({
                    background: bg,
                })
            ),
        },
    });
};
