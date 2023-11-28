const unsubscribe = mobCore.useMouseClick(
    ({ client, page, preventDefault, target, type }) => {
        // code
    }
);
unsubscribe();

///

const unsubscribe = mobCore.useMouseDown(
    ({ client, page, preventDefault, target, type }) => {
        // code
    }
);
unsubscribe();

// ...
