// @ts-check

import { mobCore } from '../../mobCore';
import { isProduction } from '../createComponent';

/**
 * @typedef {Object} componentStoreType
 * @prop { HTMLElement } element
 * @prop { String } component
 * @prop { Function } destroy
 * @prop { Array<Function> } parentPropsWatcher
 * @prop { Array<String> } freezedPros
 * @prop { Object } state
 * @prop {{ String: Array.<string> }} child
 * @prop { String } instanceName
 * @prop { String } parentId
 * @prop { String } key
 * @prop { Object } currentRepeaterState
 * @prop { Boolean } isRepeater
 * @prop { Boolean } isCancellable
 * @prop { String } id
 */

export const componentMap = new Map();
