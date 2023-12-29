import { html, staticProps } from '../../../../mobjs';

export const animatedPatternN0v1 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Animated pattern N.0 v0' })}
        ></animation-title>
        <animatedpattern-n0></animatedpattern-n0>
        <quick-nav
            ${staticProps({
                prevRoute: '#caterpillarN2',
                nextRoute: '#animatedPatternN0v2',
            })}
        ></quick-nav>
    </div>`;
};
