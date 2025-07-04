import { MobJs } from '@mobJs';
import { UseMethodByName } from '@mobJsType';
import { MyOtherComponent } from '../otherComponent/type';

/**
 * Use variable for lsp reference.
 */
import { otherComponentName } from '..';

const methods: UseMethodByName<MyOtherComponent> =
    MobJs.useMethodByName(otherComponentName);

methods?.myMethod('my_label');
