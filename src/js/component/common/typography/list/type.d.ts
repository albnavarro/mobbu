export interface List {
    state: {
        style: 'small' | 'medium' | 'big';
        dots: boolean;
        links: boolean;
        color: 'white' | 'grey' | 'hightlight' | 'black';
        items: string[] | Record<'label' | 'url', string>[];
    };
}
