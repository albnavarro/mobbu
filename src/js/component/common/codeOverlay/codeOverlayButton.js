export const CodeOverlayButton = ({ render, onMount, props, watchParent }) => {
    const { key, callback } = props;

    onMount(({ element }) => {
        element.addEventListener('click', () => callback());

        /**
         * Check if active drawer is itself.
         */
        const unWatchParentActiveContent = watchParent(
            'activeContent',
            (parentActiveKey) => {
                if (parentActiveKey === key) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            }
        );

        /**
         * Check if button is cliccable ( drawer has content )
         */
        const unWatchParentKey = watchParent(key, (value) => {
            if (value && value.length) {
                element.classList.remove('disable');
                element.classList.remove('active');
            } else {
                element.classList.add('disable');
            }
        });

        return () => {
            unWatchParentActiveContent();
            unWatchParentKey();
        };
    });

    return render(
        /* HTML */ ` <button class="code-overlay__button">${key}</button> `
    );
};
