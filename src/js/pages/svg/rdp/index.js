import { Move3D } from '@commonComponent/move-3d/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { htmlObject, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { rdp_01_scehema } from './data';
import { MouseTrail } from '@commonComponent/mouse-trail/definition';

export const rdp = async () => {
    const { data: lettering01 } = await loadTextContent({
        source: './asset/svg/rdp.svg?v=0.4',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
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
    });

    return htmlObject({
        className: 'l-rdp-01',
        content: [
            {
                className: 'l-background-shape',
                content: bg,
            },
            {
                component: MouseTrail,
            },
            {
                component: Move3D,
                modules: MobJs.staticProps(
                    /** @type {import('@commonComponent/move-3d/type').Move3DType['props']} */ ({
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
                        xLimit: 10,
                        yLimit: 20,
                        drag: true,
                        perspective: 1000,
                    })
                ),
            },
        ],
    });
};
