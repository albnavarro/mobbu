import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { AsyncTimeline } from '@pagesComponent/async-timeline/definition';
import { loadTextContent } from '@utils/utils';

/** @type {import('@mobJsType').Page} */
export const asyncTimeline = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN2',
        nextRoute: '#animatedPatternN0',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        component: AsyncTimeline,
        modules: MobJs.staticProps({ background: bg }),
    });
};
