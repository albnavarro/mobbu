import { html, staticProps } from '../../mobjs';
import { loadTextContent } from '../../utils/utils';

export const home = async () => {
    const { data: logo } = await loadTextContent({
        source: './asset/svg/logo.svg',
    });

    const { data: sideShape } = await loadTextContent({
        source: './asset/svg/piece-arrow.svg',
    });

    return html`<div class="l-index">
        <home-component ${staticProps({ logo, sideShape })}></home-component>
    </div>`;
};
