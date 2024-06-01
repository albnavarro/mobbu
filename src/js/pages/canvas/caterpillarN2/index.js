import { caterpillarN2Def } from '../../../component/pages/canvas/caterpillarN2/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([caterpillarN2Def]);

export const caterpillarN2 = () => {
    return html`<div class="l-padding">
        <caterpillar-n2></caterpillar-n2>
    </div>`;
};
