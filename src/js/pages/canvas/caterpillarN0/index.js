import { CaterpillarN0 } from '../../../component/pages/canvas/caterpillarN0/definition';
import { html, useComponent } from '../../../mobjs';

useComponent([CaterpillarN0]);

export const caterpillarN0 = () => {
    return html`<div class="l-padding">
        <caterpillar-n0></caterpillar-n0>
    </div>`;
};
