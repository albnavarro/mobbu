//@ts-check

/** @type{import('@commonComponent/Move3D/type').Move3D['state']['afterInit']} */
export const afterInit = (element) => {
    console.log(element);
};

/** @type{import('@commonComponent/Move3D/type').Move3D['state']['onUpdate']} */
export const onUpdate = ({ delta, deltaX, deltaY }) => {
    console.log(delta, deltaX, deltaY);
};
