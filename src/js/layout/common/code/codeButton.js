import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { addComponentToStore } from '../componentStore';

function onClick(event) {
    const target = event.currentTarget;
    const { js, scss, html } = target.dataset;
    console.log(js, scss, html);
}

function addHandler(element) {
    element.addEventListener('click', onClick);
}

function createComponent({ component }) {
    const parentNode = component.parentNode;
    const idClass = `id-${getUnivoqueId()}`;

    const button = document.createElement('button');
    button.classList.add('c-code-btn');
    button.classList.add(idClass);

    const { js, scss, html } = component.dataset;
    button.dataset.js = js;
    button.dataset.scss = scss;
    button.dataset.html = html;

    parentNode.appendChild(button);
    parentNode.replaceChild(button, component);

    const domButton = parentNode.querySelector(`.${idClass}`);
    addHandler(domButton);

    return domButton;
}

function destroyComponent({ domButton }) {
    domButton.removeEventListener('click', onClick);
    domButton.remove();
}

export const createCodeButton = ({ component = {} }) => {
    if (!component) return;
    const domButton = createComponent({ component });

    addComponentToStore({
        destroy: () => destroyComponent({ domButton }),
        isCancellable: false,
    });
};
