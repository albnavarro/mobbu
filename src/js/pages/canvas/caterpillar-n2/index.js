import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { CaterpillarN2 } from '@pagesComponent/canvas/n2/definition';
import { loadTextContent } from '@utils/utils';

export const caterpillarN2 = async () => {
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
        prevRoute: '#scrollerN1',
        nextRoute: '#async-timeline',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        tag: 'main',
        content: {
            component: CaterpillarN2,
            modules: MobJs.staticProps({ background: bg }),
        },
    });
};
