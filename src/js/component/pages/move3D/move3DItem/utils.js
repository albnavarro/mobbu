//@ts-check

export const getRotate = ({ startRotation, range, delta, limit }) => {
    return Number.parseFloat(
        ((range * delta) / limit - startRotation).toFixed(2)
    );
};

export const getRotateFromPosition = ({
    rotate,
    anchorPoint,
    baseRotateX,
    baseRotateY,
    item,
}) => {
    if (!rotate || !anchorPoint)
        return {
            rotateX: 0,
            rotateY: 0,
        };

    switch (rotate.toUpperCase()) {
        case 'X': {
            return (() => {
                switch (anchorPoint.toUpperCase()) {
                    case 'BOTTOM': {
                        item.style.transformOrigin = 'bottom';
                        return {
                            rotateX: baseRotateX,
                            rotateY: 0,
                        };
                    }

                    case 'TOP': {
                        item.style.transformOrigin = 'top';
                        return {
                            rotateX: -baseRotateX,
                            rotateY: 0,
                        };
                    }

                    default: {
                        return {
                            rotateX: 0,
                            rotateY: 0,
                        };
                    }
                }
            })();
        }

        case 'Y': {
            return (() => {
                switch (anchorPoint.toUpperCase()) {
                    case 'LEFT': {
                        item.style.transformOrigin = 'left';
                        return {
                            rotateX: 0,
                            rotateY: baseRotateY,
                        };
                    }

                    case 'RIGHT': {
                        item.style.transformOrigin = 'right';
                        return {
                            rotateX: 0,
                            rotateY: -baseRotateY,
                        };
                    }

                    default: {
                        return {
                            rotateX: 0,
                            rotateY: 0,
                        };
                    }
                }
            })();
        }

        case 'XY': {
            return (() => {
                switch (anchorPoint.toUpperCase()) {
                    case 'TOP-LEFT': {
                        item.style.transformOrigin = 'top left';
                        return {
                            rotateX: -baseRotateX,
                            rotateY: baseRotateY,
                        };
                    }

                    case 'TOP-RIGHT': {
                        item.style.transformOrigin = 'top right';
                        return {
                            rotateX: -baseRotateX,
                            rotateY: -baseRotateY,
                        };
                    }

                    case 'BOTTOM-LEFT': {
                        item.style.transformOrigin = 'bottom left';
                        return {
                            rotateX: baseRotateX,
                            rotateY: baseRotateY,
                        };
                    }

                    case 'BOTTOM-RIGHT': {
                        item.style.transformOrigin = 'bottom right';
                        return {
                            rotateX: baseRotateX,
                            rotateY: -baseRotateY,
                        };
                    }

                    default: {
                        return {
                            rotateX: 0,
                            rotateY: 0,
                        };
                    }
                }
            })();
        }

        default: {
            return {
                rotateX: 0,
                rotateY: 0,
            };
        }
    }
};
