export interface FooterShapeV1 {
    state: {
        position: string;
        svg: string;
        isCenter: boolean;
    };
    methods: {
        setPosition: (arg0: { position: string }) => void;
    };
}
