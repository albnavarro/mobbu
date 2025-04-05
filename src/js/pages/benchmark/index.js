import { html, MobJs } from '@mobJs';
import { BenchMarkInvalidate } from '@pagesComponent/benchMark/invalidate/definition';
import { BenchMarkRepeatWithKey } from '@pagesComponent/benchMark/repeatKey/definition';
import { BenchMarkRepeatWithKeyNested } from '@pagesComponent/benchMark/repeatKeyNested/definition';
import { BenchMarkRepeatNoKey } from '@pagesComponent/benchMark/repeatNoKey/definition';
import { BenchMarkRepeatNoKeyBindStore } from '@pagesComponent/benchMark/repeatNoKeyBindStore/definition';
import { BenchMarkRepeatWithNoKeyNested } from '@pagesComponent/benchMark/repeatNoKeyKeyNested/definition';

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
