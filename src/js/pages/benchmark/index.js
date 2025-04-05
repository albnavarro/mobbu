import { html, MobJs } from '@mobJs';
import { BenchMarkInvalidate } from '../../component/pages/benchMark/invalidate/definition';
import { BenchMarkRepeatWithKey } from '../../component/pages/benchMark/repeatKey/definition';
import { BenchMarkRepeatWithKeyNested } from '../../component/pages/benchMark/repeatKeyNested/definition';
import { BenchMarkRepeatNoKey } from '../../component/pages/benchMark/repeatNoKey/definition';
import { BenchMarkRepeatNoKeyBindStore } from '../../component/pages/benchMark/repeatNoKeyBindStore/definition';
import { BenchMarkRepeatWithNoKeyNested } from '../../component/pages/benchMark/repeatNoKeyKeyNested/definition';

MobJs.useComponent([
    BenchMarkInvalidate,
    BenchMarkRepeatNoKey,
    BenchMarkRepeatWithKey,
    BenchMarkRepeatWithKeyNested,
    BenchMarkRepeatWithNoKeyNested,
    BenchMarkRepeatNoKeyBindStore,
]);

/** @type{import('@mobJsType').PageAsync} */
export const benchMark = async ({ props }) => {
    const { rootComponent } = props;
    console.log(rootComponent);

    return html`<div class="l-benchMark"><${rootComponent}></${rootComponent}></div>`;
};
