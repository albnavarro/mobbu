import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { ScrollerN1 } from '@pagesComponent/scroller/n1/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([ScrollerN1]);

export const scrollerN1 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#caterpillarN1',
        nextRoute: '#caterpillarN2',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        component: ScrollerN1,
        modules: MobJs.staticProps({ background: bg }),
    });
};
