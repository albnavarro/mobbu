### Valutare refactor getRoundedValue.

### Refactor getValueObj.

- src/js/mob/mob-motion/animation/utils/tween-action/get-values.js
- getValueObj
- getValueObjToNative
- getValueObjFromNative

```js
/**
 * Get value of specific key from an array [{ prop: valueByKey }, ...]
 *
 * @param {Record<string, any>[]} arr
 * @param {string} key
 * @returns {Record<string, number>}
 */
export const getValueObj = (arr, key) => {
    return arr
        .map((item) => ({ [item['prop']]: Number.parseFloat(item[key]) }))
        .reduce((p, c) => ({ ...p, ...c }), {});
};
```

- Soluzione 1.
`src/js/todo/optimization_object_fromEntries.md`

- Soluzione 2.
```js
export const getValueObj = (arr, key) => {
    const result = {};
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        result[item.prop] = Number.parseFloat(item[key]);
    }
    return result;
};
```

- Soluzione 3.
```js
/**
 * Get value of specific key from an array [{ prop: valueByKey }, ...] Optimized for 60 FPS animations (called every
 * frame)
 *
 * @param {Record<string, any>[]} arr
 * @param {string} key
 * @returns {Record<string, number>}
 */
export const getValueObj = (arr, key) => {
    /** @type {Record<string, number>} */
    const result = {};
    const len = arr.length; // cache length

    for (let i = 0; i < len; i++) {
        const item = arr[i];
        const value = item[key];

        result[item['prop']] =
            typeof value === 'number' ? value : Number.parseFloat(value);
    }

    return result;
};
```

