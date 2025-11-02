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
        source: './asset/svg/lettering-mob-2025.svg?v=0.9',
    });

    const [layer01, layer02, layer03, layer04] = [
        'layer-01',
        'layer-02',
        'layer-03',
        'layer-04',
    ].map((id) => {
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
        color: 'black',
    });

    const description =
        '<strong>Svg</strong>: Mobbu2025 parallax /  <strong>[ drag or scroll ]</strong>';

    updateAnimationDescription(description);

    return html`<div class="l-mob-02">
        <mobbu-2025
            ${staticProps(
                /** @type {import('@pagesComponent/svg/mobbu2025/type').Mobbu2025['props']} */
                ({
                    layer01,
                    layer02,
                    layer03,
                    layer04,
                })
            )}
        ></mobbu-2025>
    </div>`;
};
