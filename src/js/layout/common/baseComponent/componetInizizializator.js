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
    const { style } = component.dataset;
    const parentNode = component.parentNode;
    const idClass = `id-${getUnivoqueId()}`;

    const root = document.createElement(type);
    root.classList.add(className);
    root.classList.add(idClass);
    parentNode.appendChild(root);
    parentNode.replaceChild(root, component);
    const dom = parentNode.querySelector(`.${idClass}`);

    if (style) dom.classList.add(`${className}--${style}`);

    dom.insertAdjacentHTML('afterbegin', content);
    const element = parentNode.querySelector(`.${idClass}`);

    return { element, idClass, props: component.dataset };
};
