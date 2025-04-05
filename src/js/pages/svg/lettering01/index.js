import { AnyComponent } from '@commonComponent/AnyComponent/definition';
import { Move3D } from '@commonComponent/Move3D/definition';
import { updateQuickNavState } from '@commonComponent/quickNav/utils';
import { html, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parseSvg';
import { loadTextContent } from '@utils/utils';
import { getLettering01 } from './lettering01Data';

MobJs.useComponent([Move3D, AnyComponent]);

export const lettering01 = async () => {
    const { data: lettering01 } = await loadTextContent({
        source: './asset/svg/lettering01.svg?v=0.4',
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
        nextRoute: '',
        backRoute: '#svg-overview',
        color: 'black',
    });

    return html`<div class="l-lettering01">
        <move-3d
            ${MobJs.staticProps(
                /** @type{import('../../../component/common/Move3D/type').Move3D['state']} */ ({
                    shape: getLettering01({
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
    </div>`;
};
