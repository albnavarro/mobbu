import { caterpillarN1Def } from '../../../component/pages/canvas/caterpillarN1/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([caterpillarN1Def]);

export const caterpillarN1 = () => {
    return html`<div class="l-padding">
        <caterpillar-n1></caterpillar-n1>
    </div>`;
};
