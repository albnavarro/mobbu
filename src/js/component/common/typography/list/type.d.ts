export interface List {
    state: {
        style: 'small' | 'medium' | 'big';
        dots: boolean;
        block: boolean;
        color: 'white' | 'grey' | 'hightlight' | 'black';
        items: string[];
    };
}
