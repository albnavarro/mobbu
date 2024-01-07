import { html, staticProps } from '../../../mobjs';

export const caterpillarN2 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Caterpillar N.2' })}
        ></animation-title>
        <caterpillar-n2></caterpillar-n2>
        <quick-nav
            ${staticProps({
                prevRoute: '#caterpillarN1',
                nextRoute: '#animatedPatternN0?version=0&activeId=0',
            })}
        ></quick-nav>
    </div>`;
};
