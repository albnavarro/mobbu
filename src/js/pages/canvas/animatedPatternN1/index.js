import { AnimatedPatternN1 } from '../../../component/pages/animatedPattern/animatedPatternN1/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([AnimatedPatternN1]);

export const animatedPatternN1 = () => {
    return html`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;
};
