import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { CaterpillarN2 } from '@pagesComponent/canvas/n2/definition';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([CaterpillarN2]);

export const caterpillarN2 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#scrollerN1',
        nextRoute: '#async-timeline',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        component: CaterpillarN2,
        modules: MobJs.staticProps({ background: bg }),
    });
};
