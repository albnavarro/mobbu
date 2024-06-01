import { caterpillarN0Def } from '../../../component/pages/canvas/caterpillarN0/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([caterpillarN0Def]);

export const caterpillarN0 = () => {
    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;
};
