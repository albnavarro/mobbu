import {
    getChildrenIdByName,
    getComponentNameById,
    getIdByInstanceName,
    getParentIdById,
    getStateById,
    html,
    loadUrl,
    parseDom,
    removeAndDestroyById,
    setStateById,
    staticProps,
    watchById,
} from '../../../src/js/mobjs';

/**
 * Return DOM raw string.
 */
html`<div></div>`;

/**
 * Remove and destroy element by id
 */
removeAndDestroyById({ id: '_jhsdjs' });

/**
 * Get component id by name.
 */
const idByName = getIdByInstanceName('mycomponentName');

/**
 * Watch state mutation of component by id,
 */
watchById('_jhsdjs', (value, previousValue) => {
    //
});

/**
 * Set state of component by id,
 */
setStateById('_jhsdjs', 'myState', 'value');

/**
 * Get raw state of component by id,
 * Return an object with current states value
 */
const stateById = getStateById('_jhsdjs');

/**
 * Get all children id of component by id filtered by name.
 */
const childrensId = getChildrenIdByName({
    id: '_jhsdjs',
    component: 'my-component',
});

/**
 * Get component name by id.
 */
const nameById = getComponentNameById('_jhsdjs');

/**
 * Get parent id of component by id.
 */
const parentId = getParentIdById('_jhsdjs');

/**
 * Render component inside a node.
 */
async function myFunction() {
    await parseDom(node);
}

/**
 * Standalone static props usable inside route
 */
staticProps({
    state: 'value',
    state2: 'value2',
});

/**
 * Load a route.
 */
loadUrl({ url: '/#my-route' });
