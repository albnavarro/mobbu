import { html, MobJs } from '@mobJs';
import { HomeComponent } from '@pagesComponent/homepage/definition';
import { parseSvg } from '@utils/parse-svg';
import { loadTextContent } from '@utils/utils';

MobJs.useComponent([HomeComponent]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms_nord_type.svg?v=1.4',
    });

    const { data: bg } = await loadTextContent({
        source: './asset/svg/lettering-mob.svg?v=1.3',
    });

    const [
        due,
        tre,
        quattro,
        cinque,
        sei,
        sette,
        otto,
        nove,
        dieci,
        undici,
        dodici,
    ] = [
        'due',
        'tre',
        'quattro',
        'cinque',
        'sei',
        'sette',
        'otto',
        'nove',
        'dieci',
        'undici',
        'dodici',
    ].map((id) => {
        return parseSvg({
            svg,
            id: id,
        });
    });

    return html`
        <div>
            <div class="background-shape">${bg}</div>
            <home-component
                ${MobJs.staticProps(
                    /** @type {import('@pagesComponent/homepage/type').HomeComponent['props']} */
                    ({
                        svg: [
                            due,
                            tre,
                            quattro,
                            cinque,
                            sei,
                            sette,
                            otto,
                            nove,
                            dieci,
                            undici,
                            dodici,
                        ],
                    })
                )}
            ></home-component>
        </div>
    `;
};
