/**
 * @returns {boolean}
 */
export const isRtlDirection = () => {
    const direction = document.documentElement.getAttribute('dir');
    return direction === 'rtl';
};
