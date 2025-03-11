import { updateQuickNavState } from '../../../component/common/quickNav/utils';
import { AnimatedPatternN1 } from '../../../component/pages/animatedPattern/animatedPatternN1/definition';
import { html, MobJs } from '../../../mobjs';

MobJs.useComponent([AnimatedPatternN1]);

export const animatedPatternN1 = () => {
    /** Quicknav */
    updateQuickNavState({
        active: true,
        prevRoute: '#animatedPatternN0?version=3&activeId=3',
        nextRoute: '#scrollerN0?version=0&activeId=0',
        backRoute: '#canvas-overview',
        color: 'black',
    });

    return html`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;
};
