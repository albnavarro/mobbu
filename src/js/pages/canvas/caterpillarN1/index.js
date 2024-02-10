import { html, staticProps } from '../../../mobjs';

export const caterpillarN1 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Caterpillar N.1' })}
        ></animation-title>
        <caterpillar-n1></caterpillar-n1>
        <quick-nav></quick-nav>
    </div>`;
};
