export interface Paragraph {
    state: {
        style: 'small' | 'medium' | 'big';
        boxed: boolean;
        color: 'white' | 'grey' | 'highlight' | 'black';
    };
}
