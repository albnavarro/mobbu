import { AnyComponent } from '@commonComponent/any-component/definition';
import { Move3D } from '@commonComponent/move-3d/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { rdp_01_scehema } from './data';

MobJs.useComponent([Move3D, AnyComponent]);

export const rdp = async () => {
    const { data: lettering01 } = await loadTextContent({
        source: './asset/svg/rdp_nord.svg?v=0.4',
    });

    const [
        letter_d,
        letter_r,
        letter_p,
        letter_r_shadow,
        letter_d_shadow,
        letter_p_shadow,
        letter_r_pieces,
        letter_d_pieces,
        letter_p_pieces,
        letter_r_fill,
        letter_d_fill,
        letter_p_fill,
    ] = [
        'letter_d',
        'letter_r',
        'letter_p',
        'letter_r_shadow',
        'letter_d_shadow',
        'letter_p_shadow',
        'letter_r_pieces',
        'letter_d_pieces',
        'letter_p_pieces',
        'letter_r_fill',
        'letter_d_fill',
        'letter_p_fill',
    ].map((id) => {
        return parseSvg({
            svg: lettering01,
            id: id,
        });
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '',
        nextRoute: '#mob-01',
        backRoute: '#svg-overview',
        color: 'black',
    });

    return html`<div class="l-rdp-01">
        <move-3d
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/move-3d/type').Move3D['state']} */ ({
                    shape: rdp_01_scehema({
                        letter_d,
                        letter_r,
                        letter_p,
                        letter_r_shadow,
                        letter_d_shadow,
                        letter_p_shadow,
                        letter_r_pieces,
                        letter_d_pieces,
                        letter_p_pieces,
                        letter_r_fill,
                        letter_d_fill,
                        letter_p_fill,
                    }),
                    xDepth: 100,
                    yDepth: 30,
                    factor: 20,
                    xLimit: 20,
                    yLimit: 20,
                    drag: true,
                    perspective: 1000,
                })
            )}
        ></move-3d>
        <animation-title
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/animation-title/type').AnimationTitle['state']} */ ({
                    title: 'Rdp 01/<span>Svg</span>',
                    list: ['Svg', 'Spring', 'Lerp'],
                })
            )}
        ></animation-title>
    </div>`;
};
