// @ts-check

import { mainStore } from '../mainStore';

/**
 * @param { Object } mainObject
 * @param { String } mainObject.repeatId
 * @param { Object } mainObject.obj
 * @param { Function } mainObject.obj.afterUpdate
 * @param { Function } mainObject.obj.beforeUpdate
 * @param { Function } mainObject.obj.getChildren
 * @param { String } mainObject.obj.id
 * @param { Boolean } mainObject.obj.clean
 * @param { String|undefined } mainObject.obj.key
 * @param { Object } mainObject.obj.props
 * @param { String|undefined } mainObject.obj.state
 * @param { Function } mainObject.obj.setState
 * @param { String } mainObject.obj.targetComponent
 * @param { Function } mainObject.obj.watch
 * @param { Function } mainObject.obj.emit
 * @param { Object } mainObject.obj.dynamicProps
 *
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export const addRepeat = ({ repeatId, obj }) => {
    mainStore.set('repeat', (/** @type {Array} */ prev) => {
        return [...prev, { [repeatId]: obj }];
    });
};
