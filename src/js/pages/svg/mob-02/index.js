import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { Mobbu2025 } from '@pagesComponent/svg/mobbu2025/definition';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { MobMotionCore } from '@mobMotion';
import { OnlyTablet } from '@commonComponent/only-tablet/definition';

export const mob_02 = async () => {
    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.4',
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

    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3',
    });

    const [layer02, layer03] = ['layer-02', 'layer-03'].map((id) => {
        return parseSvg({
            svg: letteringMob,
            id: id,
        });
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#mob-01',
        nextRoute: '',
        backRoute: '#svg-overview',
    });

    return htmlObject({
        tag: 'main',
        className: 'l-mob-02',
        content: [
            {
                component: H1Standalone,
                modules: MobJs.staticProps(
                    /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                        text: 'Svg animation: Mob02',
                    })
                ),
            },
            {
                className: 'l-background-shape',
                content: bg,
            },
            {
                tag: 'h3',
                className: 'title',
                content: 'Scroll or Drag',
            },
            {
                component: Mobbu2025,
                modules: MobJs.staticProps(
                    /** @type {import('@pagesComponent/svg/mobbu2025/type').Mobbu2025['props']} */
                    ({
                        layer02,
                        layer03,
                    })
                ),
            },
        ],
    });
};
