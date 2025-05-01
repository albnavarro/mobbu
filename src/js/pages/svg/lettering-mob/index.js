import { AnyComponent } from '@commonComponent/any-component/definition';
import { Move3D } from '@commonComponent/move-3d/definition';
import { updateQuickNavState } from '@commonComponent/quick-nav/utils';
import { html, MobJs } from '@mobJs';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';
import { getLettering_mob } from './lettering-01-data';

MobJs.useComponent([Move3D, AnyComponent]);

export const letteringMob = async () => {
    const { data: letteringMob } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=0.1',
    });

    const [u1, o, m1, m2, m3, m4, b1, b2, b3, b4, b5, g1] = [
        'U1_block',
        'O_block',
        'M1_block',
        'M2_block',
        'M3_block',
        'M4_block',
        'B1_block',
        'B2_block',
        'B3_block',
        'B4_block',
        'B5_block',
        'G1_block',
    ].map((id) => {
        return parseSvg({
            svg: letteringMob,
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

    return html`<div class="l-lettering-mob">
        <move-3d
            ${MobJs.staticProps(
                /** @type {import('@commonComponent/move-3d/type').Move3D['state']} */ ({
                    shape: getLettering_mob({
                        u1,
                        o,
                        m1,
                        m2,
                        m3,
                        m4,
                        b1,
                        b2,
                        b3,
                        b4,
                        b5,
                        g1,
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
