import { AnyComponent } from '../../../component/common/AnyComponent/definition';
import { Move3D } from '../../../component/common/Move3D/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { parseSvg } from '../../../utils/parseSvg';
import { loadTextContent } from '../../../utils/utils';
import { getLettering01 } from './lettering01Data';

useComponent([Move3D, AnyComponent]);

export const lettering01 = async () => {
    const { data: lettering01 } = await loadTextContent({
        source: './asset/svg/lettering01.svg',
    });

    const [
        letter_b_star,
        letter_b,
        letter_b_over,
        letter_b_outline,
        letter_m,
        letter_m_star,
        letter_o_star,
        letter_o,
        letter_m_outline,
        letter_m_over,
        letter_o_oultine,
        letter_m_star_top,
        letter_m_shadow,
        letter_b_shadow,
        letter_o_shadow,
    ] = [
        'letter_b_star',
        'letter_b',
        'letter_b_over',
        'letter_b_outline',
        'letter_m',
        'letter_m_star',
        'letter_o_star',
        'letter_o',
        'letter_m_outline',
        'letter_m_over',
        'letter_o_oultine',
        'letter_m_star_top',
        'letter_m_shadow',
        'letter_b_shadow',
        'letter_o_shadow',
    ].map((id) => {
        return parseSvg({
            svg: lettering01,
            id: id,
        });
    });

    return html`<div>
        <move-3d
            ${staticProps(
                /** @type{import('../../../component/common/Move3D/type').Move3D['state']} */ ({
                    shape: getLettering01({
                        letter_o,
                        letter_o_oultine,
                        letter_o_star,
                        letter_m,
                        letter_m_outline,
                        letter_m_over,
                        letter_m_star,
                        letter_m_star_top,
                        letter_b,
                        letter_b_outline,
                        letter_b_over,
                        letter_b_star,
                        letter_m_shadow,
                        letter_b_shadow,
                        letter_o_shadow,
                    }),
                    xDepth: 50,
                    factor: 50,
                })
            )}
        ></move-3d>
    </div>`;
};
