export const NavigationButton = ({ props, render, onMount }) => {
    onMount(({ element }) => {
        element.addEventListener('click', () => {
            console.log(url);
        });
    });

    const { label, url, arrowClass, subMenuClass } = props;
    return render(`
        <button class="l-navigation__link ${arrowClass} ${subMenuClass}">
            ${label}
        </button>
    `);
};
