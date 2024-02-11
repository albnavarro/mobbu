import { html, staticProps } from '../../../mobjs';
import { loadTextContent } from '../../../utils/utils';

export const mv1 = async () => {
    const { data: logo } = await loadTextContent({
        source: './asset/svg/logo-color.svg',
    });

    const { data: sideShape } = await loadTextContent({
        source: './asset/svg/piece-arrow.svg',
    });

    return html`<div>
        <mv1-component ${staticProps({ logo, sideShape })}></mv1-component>
    </div>`;
};
