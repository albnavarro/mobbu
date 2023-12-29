import { html, staticProps } from '../../../mobjs';

export const caterpillarN0 = () => {
    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
        <quick-nav
            ${staticProps({
                nextRoute: '#caterpillarN1',
                prevRoute: '',
            })}
        ></quick-nav>
    </div>`;
};
