import { getPropsById } from '../../baseComponent/componentStore';

/**
 * On click function.
 */
function onClick(event) {
    const target = event.currentTarget;
    const id = target.id;
    const props = getPropsById(id);
    const { js, scss, html } = props;
    console.log('props', js, scss, html);
}

/**
 * Add handler.
 */
function addHandler({ element }) {
    element.addEventListener('click', onClick);
}

/**
 * Destroy function.
 */
function destroyComponent({ id }) {
    const element = document.querySelector(`#${id}`);
    if (!element) return;

    element.removeEventListener('click', onClick);
    element.remove();
}

function addStyle({ style, element }) {
    const className = {
        primary: 'c-code-btn--primary',
    };

    element.classList.add(className?.[style]);
}

/**
 * Create component
 */
export const CodeButton = ({ id, onDestroy, props, render, onMount }) => {
    onMount(({ element }) => {
        const { style } = props;
        addStyle({ style, element });
        addHandler({ element });
    });

    onDestroy(() => destroyComponent({ id }));

    return render(`
        <button class="c-code-btn">
            <span><></span>
        </button>
    `);
};
