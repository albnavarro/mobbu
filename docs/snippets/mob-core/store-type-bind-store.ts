interface OtherStore {
    prop1: number;
    sum: number;
}

interface MyStore extends Readonly<OtherStore> {
    prop2: number;
}
