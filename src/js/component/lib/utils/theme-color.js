/**
 * @returns {boolean}
 */
export const isDarkTheme = () => {
    const theme = document.documentElement.getAttribute('theme');
    return theme === 'dark';
};

/**
 * @returns {void}
 */
export const updateHighlightTheme = () => {
    const lightAsset = /** @type {HTMLLinkElement} */ (
        document.querySelector('#hljs-theme-light')
    );

    const darkAsset = /** @type {HTMLLinkElement} */ (
        document.querySelector('#hljs-theme-dark')
    );

    if (!lightAsset || !darkAsset) return;
    const isDark = isDarkTheme();

    lightAsset.disabled = isDark;
    darkAsset.disabled = !isDark;
};

/**
 * @param {object} [params]
 * @param {'light' | 'dark'} [params.theme='light'] Default is `'light'`
 */
export const setTheme = ({ theme = 'light' } = {}) => {
    document.documentElement.setAttribute('theme', theme);
    updateHighlightTheme();
};
