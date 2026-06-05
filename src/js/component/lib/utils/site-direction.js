/**
 * @returns {boolean}
 */
export const isRtlDirection = () => {
    const direction = document.documentElement.getAttribute('dir');
    return direction === 'rtl';
};

/**
 * @param {object} [params]
 * @param {'ltr' | 'rtl'} [params.direction='ltr'] Default is `'ltr'`
 */
export const setSiteDirection = ({ direction = 'ltr' } = {}) => {
    document.documentElement.setAttribute('dir', direction);
};
