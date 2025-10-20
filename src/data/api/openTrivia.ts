import { useQuery, UseQueryResult } from '@tanstack/react-query';

const API_CATEGORIES_URL= 'https://opentdb.com/api_category.php';

export type TriviaQuestion = {
    category: string
    type: 'multiple' | 'boolean'
    difficulty: 'easy' | 'medium' | 'hard'
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

export type TriviaCategory = { id: number; name: string }

async function fetchCategories(): Promise<TriviaCategory[]> {
    return fetch(API_CATEGORIES_URL).then(
        (res) => {
            if(!res.ok) {
                throw new Error('Failed to load categories!')
            }
            return res.json();
        }).then((data) => data.trivia_categories || []);
}

export function useCategoriesQuery(): UseQueryResult<TriviaCategory[], Error>{
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 60 * 60 * 1000, // 1h
    });
}