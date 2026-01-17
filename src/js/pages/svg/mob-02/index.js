import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { updateAnimationDescription } from '@commonComponent/animation-description/utils';
import { mobbbu2025 } from '@pagesComponent/svg/mobbu2025/definition';
import { staticProps } from 'src/js/mob/mob-js/utils';

MobJs.useComponent([mobbbu2025]);

export const mob_02 = async () => {
    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob-2025-pure.svg?v=0.9',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
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

    const description = '<strong>Svg</strong>: Mobbu2025 parallax';

    updateAnimationDescription(description);

    return html`<div class="l-mob-02">
        <div class="background-shape">${bg}</div>
        <h3 class="l-mob-02__title">Scroll or Drag</h3>
        <mobbu-2025
            ${staticProps(
                /** @type {import('@pagesComponent/svg/mobbu2025/type').Mobbu2025['props']} */
                ({
                    layer02,
                    layer03,
                })
            )}
        ></mobbu-2025>
    </div>`;
};
