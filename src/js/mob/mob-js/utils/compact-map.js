import { MobCore } from '@mobCore';
import { compactComponentMap } from '../component/component-map';
import { compactBindPropsMap } from '../modules/bind-props/bind-props-map';

/**
 * @returns {void}
 */
export const compactMap = () => {
    MobCore.compactStoreMap();
    compactComponentMap();
    compactBindPropsMap();
};
