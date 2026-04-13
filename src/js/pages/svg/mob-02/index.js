import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { Mobbu2025 } from '@pagesComponent/svg/mobbu2025/definition';
import { staticProps } from 'src/js/mob/mob-js/utils';

MobJs.useComponent([Mobbu2025]);

export const mob_02 = async () => {
    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob-2025-pure-optimized.svg?v=0.3',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.4',
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
        className: 'l-mob-02',
        content: [
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
                modules: staticProps(
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
