${bindProps(
    /** @returns {ReturnBindProps<import('../otherCOmponent/type').MyOtherComponent>} */
    () => ({
        shape: proxiState.data,
        xDepth: proxiState.xDepth,
        yDepth: proxiState.yDepth,
        xLimit: proxiState.xLimit,
        yLimit: proxiState.yLimit,
        factor: proxiState.factor,
        debug: proxiState.debug,
    })
)}
