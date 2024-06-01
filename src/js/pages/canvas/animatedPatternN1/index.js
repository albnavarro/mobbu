import { animatedPatternN1Def } from '../../../component/pages/animatedPattern/animatedPatternN1/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([animatedPatternN1Def]);

export const animatedPatternN1 = () => {
    return html`<div class="l-padding">
        <animatedpattern-n1></animatedpattern-n1>
    </div>`;
};
