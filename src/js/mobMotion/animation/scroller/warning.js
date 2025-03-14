export const scrollerWarningNoUnitMiusure = () => {
    console.warn(
        'parallax prop checker: value in start or end prop with no unit misure is not allowed, failed operation, use vh in vertical mode or vw in horizontal or px'
    );
};

export const scrollerWarningVhIsNotAllowed = () => {
    console.warn(
        'parallax prop checker: value in start or end in vh is not allowed in horizontal mode, use vw or px'
    );
};

export const scrollerWarningVwIsNotAllowed = () => {
    console.warn(
        'parallax prop checker: value in start or end in vw is not allowed in vertical mode, use vh or px'
    );
};
