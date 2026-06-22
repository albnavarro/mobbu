/**
 * @returns {boolean}
 */
export const isDarkTheme = () => {
    const theme = document.documentElement.dataset['theme'];
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

    lightAsset.media = isDark ? 'not all' : 'all';
    darkAsset.media = isDark ? 'all' : 'not all';
};

/**
 * @param {object} [params]
 * @param {'light' | 'dark'} [params.theme='light'] Default is `'light'`
 */
export const setTheme = ({ theme = 'light' } = {}) => {
    document.documentElement.dataset['theme'] = theme;
    updateHighlightTheme();
};
