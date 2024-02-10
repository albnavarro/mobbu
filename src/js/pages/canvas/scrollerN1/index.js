import { html, staticProps } from '../../../mobjs';

export const scrollerN1 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Scroller N.1' })}
        ></animation-title>
        <caterpillar-n3></caterpillar-n3>
        <quick-nav></quick-nav>
    </div>`;
};
