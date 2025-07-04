import { MobJs } from '@mobJs';
import { UseMethodArrayByName } from '@mobJsType';
import { MyOtherComponent } from './otherComponent/type';

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '..';

const methods: UseMethodArrayByName<MyOtherComponent> =
    MobJs.useMethodByName(otherComponentName);

methods.forEach((method) => {
    method?.myMethod('my_label');
});
