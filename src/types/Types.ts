export interface news {
    id: number;
    title: string;
    score: number;
    author: string;
    date: string;
    kids: Array<number>;
    url: string;
};

export interface comment {
    id: number;
    text: string;
    author: string;
    date: string;
    kids: Array<number> | undefined;
}