import { html, staticProps } from '../../../../mobjs';

export const animatedPatternN1 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Animated pattern N.1' })}
        ></animation-title>
        <animatedpattern-n1></animatedpattern-n1>
        <quick-nav
            ${staticProps({
                prevRoute: '#animatedPatternN0v7',
                nextRoute: '#scrollerN0v1',
            })}
        ></quick-nav>
    </div>`;
};
