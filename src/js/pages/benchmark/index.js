import { html, MobJs } from '@mobJs';
import { BenchMarkInvalidate } from '@pagesComponent/benchmark/invalidate/definition';
import { BenchMarkRepeatWithKey } from '@pagesComponent/benchmark/repeat-key/definition';
import { BenchMarkRepeatWithKeyNested } from '@pagesComponent/benchmark/repeat-key-nested/definition';
import { BenchMarkRepeatNoKey } from '@pagesComponent/benchmark/repeat-no-key/definition';
import { BenchMarkRepeatNoKeyBindStore } from '@pagesComponent/benchmark/repeat-no-key-bind-store/definition';
import { BenchMarkRepeatWithNoKeyNested } from '@pagesComponent/benchmark/repeat-no-key-nested/definition';

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
