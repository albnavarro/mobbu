export interface Paragraph {
    state: {
        style: 'small' | 'medium' | 'big';
        boxed: boolean;
        note: boolean;
        color: 'white' | 'grey' | 'highlight' | 'black';
    };
}
