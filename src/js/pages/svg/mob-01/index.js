import { AnyComponent } from '@commonComponent/any-component/definition';
import { MouseTrail } from '@commonComponent/mouse-trail/definition';
import { Move3D } from '@commonComponent/move-3d/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { rdp_01_schema } from './data';

MobJs.useComponent([Move3D, AnyComponent, MouseTrail]);

export const lettering01 = async () => {
    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=0.9',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/rdp.svg?v=1.3',
    });

    const [
        u0,
        u1,
        o,
        o_b,
        m1,
        m1_b,
        m2,
        m3,
        m3_b,
        m4,
        m4_b,
        b1,
        b1_b,
        b3,
        b4,
        b5,
        sign,
        b1_stone,
        m1_stone,
    ] = [
        'U0_block',
        'U1_block',
        'O_block',
        'O_b_block',
        'M1_block',
        'M1_b_block',
        'M2_block',
        'M3_block',
        'M3_b_block',
        'M4_block',
        'M4_b_block',
        'B1_block',
        'B1_b_block',
        'B3_block',
        'B4_block',
        'B5_block',
        'sign',
        'Bstone_1_block',
        'Mstone_1_block',
    ].map((id) => {
        return parseSvg({
            svg: letteringMob,
            id: id,
        });
    });

    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#rdp-01',
        nextRoute: '#mob-02',
        backRoute: '#svg-overview',
    });

    return html`<div class="l-mob-01">
        <div class="background-shape">${bg}</div>
        <mouse-trail></mouse-trail>
        <move-3d
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/move-3d/type').Move3D['props']} */ ({
                    shape: rdp_01_schema({
                        u0,
                        u1,
                        o,
                        o_b,
                        m1,
                        m2,
                        m3,
                        m4,
                        b1,
                        b1_b,
                        b3,
                        b4,
                        b5,
                        sign,
                        m1_b,
                        m3_b,
                        m4_b,
                        b1_stone,
                        m1_stone,
                    }),
                    xDepth: 100,
                    yDepth: 30,
                    factor: 20,
                    xLimit: 10,
                    yLimit: 20,
                    drag: true,
                    perspective: 1000,
                })
            )}
        ></move-3d>
    </div>`;
};
