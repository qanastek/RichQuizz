export interface Quizz {
    quizz_id: number;
    category_name: string;
    category_id: number;
    type_name: string;
    type_id: number;
    difficulty_name: string;
    difficulty_id: number;
    difficulty_points: number;
    image_url: string;
    question: string;
    answer: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    status_name: string;
    status_id: number;
}