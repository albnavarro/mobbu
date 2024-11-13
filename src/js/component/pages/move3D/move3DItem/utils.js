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
                        return {
                            rotateX: baseRotateX,
                            rotateY: 0,
                        };
                    }

                    case 'TOP': {
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
                        return {
                            rotateX: 0,
                            rotateY: baseRotateY,
                        };
                    }

                    case 'RIGHT': {
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
                        return {
                            rotateX: -baseRotateX,
                            rotateY: baseRotateY,
                        };
                    }

                    case 'TOP-RIGHT': {
                        return {
                            rotateX: -baseRotateX,
                            rotateY: -baseRotateY,
                        };
                    }

                    case 'BOTTOM-LEFT': {
                        return {
                            rotateX: baseRotateX,
                            rotateY: baseRotateY,
                        };
                    }

                    case 'BOTTOM-RIGHT': {
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
