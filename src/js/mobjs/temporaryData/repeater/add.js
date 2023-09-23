// @ts-check

/**
 * @typedef { Object } repeaterType
 * @property { function({container:HTMLElement, childrenId:Array.<String>}):void } afterUpdate
 * @property { function({container:HTMLElement, childrenId:Array.<String>}):void } beforeUpdate
 * @property { Function } getChildren
 * @property { String } id
 * @property { Boolean } clean
 * @property { String|undefined } key
 * @property { String|undefined } state
 * @property { Function } setState
 * @property { String } targetComponent
 * @property { Function } watch
 * @property { Function } emit
 * @property { Function } render
 *
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */

/**
 * @type {Map<String,repeaterType>}
 */
export const repeatMap = new Map();

/**
 * @param { Object } mainObject
 * @param { String } mainObject.repeatId
 * @param { repeaterType } mainObject.obj
 *
 * @description
 * Add new repeater id and props.
 * Tehe repeater will execute after component render.
 */
export const addRepeat = ({ repeatId, obj }) => {
    repeatMap.set(repeatId, obj);
};
