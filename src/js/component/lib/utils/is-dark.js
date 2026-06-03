/**
 * @returns {boolean}
 */
export const isDarkTheme = () => {
    const direction = document.documentElement.getAttribute('theme');
    return direction === 'dark';
};
