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

    return { idClass };
}

function destroyComponent({ idClass }) {
    const button = document.querySelector(`.${idClass}`);
    if (!button) return;

    button.removeEventListener('click', onClick);
    button.remove();
}

export const createCodeButton = ({ component = {} }) => {
    if (!component) return;
    const { idClass } = createComponent({ component });

    addComponentToStore({
        destroy: () => destroyComponent({ idClass }),
        isCancellable: false,
    });
};
