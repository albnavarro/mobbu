/** @type {import('@commonComponent/move-3d/type').Move3DType['props']['afterInit']} */
export const afterInit = (element) => {
    console.log(element);
};

/** @type {import('@commonComponent/move-3d/type').Move3DType['props']['onUpdate']} */
export const onUpdate = ({ delta, deltaX, deltaY }) => {
    console.log(delta, deltaX, deltaY);
};
