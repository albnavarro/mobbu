/**
 * @type {import('../../type').RedirectFunction} params.route
 */
let redirectFunction = ({ route }) => route;

/**
 * @param {import('../../type').RedirectFunction} fn
 * @returns {void}
 */
export const setRedirectFunction = (fn) => {
    redirectFunction = fn;
};

/**
 * @param {object} params
 * @param {string} params.route
 * @returns {{ route: string; isRedirect: boolean }}
 */
export const tryRedirect = ({ route }) => {
    const newRoute = redirectFunction({ route });

    return {
        route: newRoute,
        isRedirect: newRoute !== route,
    };
};
