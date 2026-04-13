import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { CaterpillarN1 } from '@pagesComponent/canvas/n1/definition';
import { loadTextContent } from '@utils/utils';

export const caterpillarN1 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '#scrollerN1',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        component: CaterpillarN1,
        modules: MobJs.staticProps({ background: bg }),
    });
};
