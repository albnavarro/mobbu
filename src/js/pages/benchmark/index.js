import { BenchMarkInvalidate } from '../../component/pages/benchMark/invalidate/definition';
import { BenchMarkRepeatNoKey } from '../../component/pages/benchMark/repeatNoKey/definition';
import { html, useComponent } from '../../mobjs';

useComponent([BenchMarkInvalidate, BenchMarkRepeatNoKey]);

export const benchMark = async ({ props }) => {
    const { rootComponent } = props;
    console.log(rootComponent);

    return html`<div class="l-benchMark"><${rootComponent}></${rootComponent}></div>`;
};
