import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';

/**
 *  Create base DOM component from component tag.
 */
export const componentInizialiazator = ({
    component,
    className,
    content = '',
    type = 'div',
}) => {
    const id = getUnivoqueId();
    const { style } = component.dataset;
    const parentNode = component.parentNode;
    const prevContent = component.innerHTML;

    const root = document.createElement(type);
    root.classList.add(className);
    root.dataset.id = id;
    if (style) root.classList.add(`${className}--${style}`);
    parentNode.appendChild(root);
    parentNode.replaceChild(root, component);
    const element = parentNode.querySelector(`[data-id=${id}]`);

    element.insertAdjacentHTML('afterbegin', content);
    element.insertAdjacentHTML('beforeEnd', prevContent);

    return { element, props: { ...component.dataset }, id };
};
