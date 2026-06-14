import { OnlyTablet } from '@commonComponent/only-tablet/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { CaterpillarN1 } from '@pagesComponent/canvas/n1/definition';
import { loadTextContent } from '@utils/utils';

export const caterpillarN1 = async () => {
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
        prevRoute: '',
        nextRoute: '#scrollerN1',
        backRoute: '#canvas-overview',
    });

    return htmlObject({
        tag: 'main',
        content: {
            component: CaterpillarN1,
            modules: MobJs.staticProps({ background: bg }),
        },
    });
};
