import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { checkType } from '../../../mobbu/store/storeType';

/**
 *  Create base DOM component from component tag.
 */
export const createComponent = ({
    component,
    className,
    content = '',
    type = 'div',
}) => {
    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;
    const root = document.createElement(type);

    /**
     * Add main class
     */
    const classParsed = checkType(Array, className) ? className : [className];
    classParsed.forEach((item) => root.classList.add(item));

    /**
     * Add element to DOM
     */
    parentNode.appendChild(root);
    parentNode.replaceChild(root, component);

    /**
     * Create Univoque id
     */
    const id = getUnivoqueId();
    root.dataset.id = id;
    const element = parentNode.querySelector(`[data-id=${id}]`);

    /**
     * Add previous and new content.
     */
    element.insertAdjacentHTML('afterbegin', content);
    element.insertAdjacentHTML('beforeEnd', prevContent);

    return { element, props: { ...component.dataset }, id };
};
