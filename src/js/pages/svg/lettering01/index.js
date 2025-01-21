import { Move3DPage } from '../../../component/pages/move3D/definition';
import { html, useComponent } from '../../../mobjs';
import { parseSvg } from '../../../utils/parseSvg';
import { loadTextContent } from '../../../utils/utils';

useComponent([Move3DPage]);

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
    ].map((id) => {
        return parseSvg({
            svg: lettering01,
            id: id,
        });
    });

    console.log(
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
        letter_m_star_top
    );

    return html`<div>lettering01</div>`;
};
