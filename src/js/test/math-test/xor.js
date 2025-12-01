export const swapVariables = () => {
    /**
     * Classic way: XOR;
     *
     * - Xor scambia i bit a `basso livello` ( 0 | 1 ) rendendo possibile uno swap tra variabili senza usare una variabile
     *   di supporto.
     */
    let a = 2;
    let b = 10;

    console.log('original:', a, b); // 5, 10

    a = a ^ b; // a diventa 15 (5 XOR 10)
    b = a ^ b; // b diventa 5  (15 XOR 10)
    a = a ^ b; // a diventa 10 (15 XOR 5)

    console.log('Dopo XOR:', a, b); // 10, 5

    /**
     * Modern way with deconstructing:
     */
    [a, b] = [b, a];
    console.log('Dopo deconstructing:', a, b); // 10, 5
};
