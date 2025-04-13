export interface Paragraph {
    state: {
        style: 'small' | 'medium' | 'big';
        boxed: boolean;
        note: boolean;
        color: 'inherit' | 'white' | 'hightlight' | 'black';
    };
}
