export const CodeOverlayButton = ({ render, onMount, props, watchParent }) => {
    const { key, callback } = props;

    onMount(({ element }) => {
        element.addEventListener('click', () => callback());

        const unWatchParent = watchParent('activeContent', (activeKey) => {
            if (activeKey === key) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });

        return () => {
            unWatchParent();
        };
    });

    return render(
        /* HTML */ ` <button class="code-overlay__button">${key}</button> `
    );
};
