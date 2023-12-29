import { html, staticProps } from '../../../mobjs';

export const caterpillarN0 = () => {
    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
        <quick-nav
            ${staticProps({
                prevRoute: '',
                nextRoute: '#caterpillarN1',
            })}
        ></quick-nav>
    </div>`;
};
