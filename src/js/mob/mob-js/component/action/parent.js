import { useParentIdQuery } from '../../parse/strategy';
import { queryAllFutureComponent } from '../../query/query-all-future-component';
import { getAllUserChildPlaceholder } from '../../modules/user-component';
import { componentMap } from '../component-map';
import { updateChildrenArray } from '../utils';
import { getIdFromWeakElementMap } from '../weak-element-map';

/**
 * Get parent id By id
 *
 * @param {string} id
 * @returns {string | undefined}
 */
export const getParentIdById = (id = '') => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentId = item?.parentId;

    if (!parentId) {
        // console.warn(`getParentIdById failed no id found`);
        return;
    }

    return parentId;
};

/**
 * Update child id. From current component id get parentID and then add to parent child id
 *
 * @param {object} obj
 * @param {string} obj.id
 */
export const addSelfIdToParentComponent = ({ id = '' }) => {
    if (!id || id === '') return;

    const item = componentMap.get(id);
    const parentId = item?.parentId;

    const componentName = item?.componentName ?? '';
    if (!parentId) return;

    const value = componentMap.get(parentId);
    if (!value) return;

    const { child } = value;
    if (!child) return;

    componentMap.set(parentId, {
        ...value,
        child: {
            ...child,
            ...updateChildrenArray({
                currentChild: child,
                id,
                componentName,
            }),
        },
    });
};

/**
 * Add self id to future component. If id is assigned to component nested in next cycle will be override.
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.element
 * @param {string} params.id
 * @returns {void}
 */
export const addParentIdToFutureComponent = ({ element, id }) => {
    if (!element) return;

    if (useParentIdQuery) {
        const children = queryAllFutureComponent(element, false);
        children.forEach((child) => {
            child.setParentId(id);
        });

        return;
    }

    const childrenComponent = getAllUserChildPlaceholder({ element });
    childrenComponent.forEach((component) => {
        component.setParentId(id);
    });
};

/**
 * Find first component parent node.
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.element
 * @returns {string | undefined}
 */
export const getParentIdFromWeakElementMap = ({ element }) => {
    if (!element) return;
    let parentNode = element.parentNode;

    /**
     * @type {string | undefined}
     */
    let id;

    while (parentNode && !id) {
        id = getIdFromWeakElementMap({
            element: /** @type {HTMLElement} */ (parentNode),
        });

        if (!id) {
            parentNode = parentNode.parentNode;
        }
    }

    return id ?? '';
};

/**
 * Check if moduleScopeId ( repeater/invalidare scopeId ) is contained ( directly or parental ) by targetComponentId,
 * check recusivly parent repeater/invalidate id until we found a valid occurrence.
 *
 * @param {object} params
 * @param {string} params.moduleScopeId - Module scope id, the component where repeat/invalidate is defined.
 * @param {string} params.targetComponentId - The target component removed or added that should contain
 *   invalidate/repeater.
 * @returns {boolean}
 */
export const compareIdOrParentIdRecursive = ({
    moduleScopeId,
    targetComponentId,
}) => {
    /**
     * Repeat/invalidate moduleScopeId or it's parent id is the same of targetComponentId. moduleScopeId is child of
     * targetComponentId
     */
    if (moduleScopeId === targetComponentId) return true;

    /**
     * Get parent component in witch repeat/invalidate is defined.
     */
    const item = componentMap.get(moduleScopeId);

    /**
     * No more parent, moduleScopeId is not contained in targetComponentId
     */
    if (!item) return false;

    const parentId = item?.parentId ?? '';

    /**
     * If moduleScopeId is defined in component get parent moduleScopeId until/if the the two id is equal.
     */
    return compareIdOrParentIdRecursive({
        moduleScopeId: parentId,
        targetComponentId,
    });
};
