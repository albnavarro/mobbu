// @ts-check

/**
 * @param {object} obj
 * @param {{bind:Array<String>, props: Function}|undefined} obj.dynamicProps
 * @param {string|undefined} obj.stateToWatch
 * @returns {{bind:Array<string>, props: function}|undefined}
 *
 * @description
 * Remove watch state from bind.
 */
export const removeWatchFromDynamicProps = ({ dynamicProps, stateToWatch }) => {
    if (!dynamicProps || !('bind' in dynamicProps) || !stateToWatch)
        return dynamicProps;

    const { bind } = dynamicProps;
    const newBind = bind.filter(
        (/** @type{String} */ state) => state !== stateToWatch
    );

    return { ...dynamicProps, bind: newBind };
};

export const renderHtml = (
    /** @type{string[]} */ strings,
    /** @type{string[]} */ ...values
) => String.raw({ raw: strings }, ...values);
