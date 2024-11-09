import { HomeComponent } from '../../component/pages/homepage/definition';
import { html, staticProps, useComponent } from '../../mobjs';
import { loadTextContent } from '../../utils/utils';

useComponent([HomeComponent]);

export const home = async () => {
    const { data: svg } = await loadTextContent({
        source: './asset/svg/ms.svg',
    });

    const { data: data_left } = await loadTextContent({
        source: './asset/svg/footer_shape_left.svg',
    });

    const { data: data_right } = await loadTextContent({
        source: './asset/svg/footer_shape_right.svg',
    });

    return html`<div class="l-index">
        <home-component
            ${staticProps({
                svg,
                svgLeft: data_left,
                svgRight: data_right,
            })}
        ></home-component>
    </div>`;
};
