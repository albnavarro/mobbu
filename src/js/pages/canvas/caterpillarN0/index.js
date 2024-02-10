import { html, staticProps } from '../../../mobjs';

export const caterpillarN0 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Caterpillar N.0' })}
        ></animation-title>
        <caterpillar-n0></caterpillar-n0>
        <quick-nav></quick-nav>
    </div>`;
};
