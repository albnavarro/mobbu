function getSubmenu(children, staticProps) {
    return children
        .map((child) => {
            const { label, url } = child;

            return /* HTML */ `
                <li class="l-navigation__submenu__item">
                    <NavigationButton
                        ${staticProps({
                            label,
                            url,
                            ...{ subMenuClass: 'l-navigation__link--submenu' },
                        })}
                    ></NavigationButton>
                </li>
            `;
        })
        .join('');
}

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const NavigationSubmenu = ({
    onMount,
    render,
    getState,
    staticProps,
}) => {
    const { children } = getState();

    onMount(({ element }) => {
        return () => {};
    });

    return render(/* HTML */ `
        <ul class="l-navigation__submenu">
            ${getSubmenu(children, staticProps)}
        </ul>
    `);
};
