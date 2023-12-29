import { html, staticProps } from '../../../mobjs';

export const caterpillarN2 = () => {
    return html`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
        <quick-nav
            ${staticProps({
                prevRoute: '#caterpillarN1',
                nextRoute: '#animatedPatternN0v1',
            })}
        ></quick-nav>
    </div>`;
};
