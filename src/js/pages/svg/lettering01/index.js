import { AnyComponent } from '../../../component/common/AnyComponent/definition';
import { Move3D } from '../../../component/common/Move3D/definition';
import { html, staticProps, useComponent } from '../../../mobjs';
import { parseSvg } from '../../../utils/parseSvg';
import { loadTextContent } from '../../../utils/utils';
import { getLettering01 } from './lettering01Data';

useComponent([Move3D, AnyComponent]);

export const lettering01 = async () => {
    const { data: lettering01 } = await loadTextContent({
        source: './asset/svg/lettering01.svg?v=0.2',
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

    return html`<div>
        <move-3d
            ${staticProps(
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
                    xDepth: 50,
                    factor: 50,
                })
            )}
        ></move-3d>
    </div>`;
};
