import { html, staticProps } from '../../../mobjs';

export const animatedPatternN1 = () => {
    return html`<div class="l-padding">
        <animation-title
            ${staticProps({ title: 'Animated pattern N.1' })}
        ></animation-title>
        <animatedpattern-n1></animatedpattern-n1>
        <quick-nav
            ${staticProps({
                prevRoute: '#animatedPatternN0?version=3&activeId=3',
                nextRoute: '#scrollerN0?version=0&activeId=0',
            })}
        ></quick-nav>
    </div>`;
};
