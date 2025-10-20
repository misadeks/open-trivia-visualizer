import { useQuery, UseQueryResult } from '@tanstack/react-query';

const API_CATEGORIES_URL= 'https://opentdb.com/api_category.php';
const API_QUESTIONS_URL = 'https://opentdb.com/api.php?amount=50';

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

async function fetchQuestions():Promise<TriviaQuestion[]> {
    return fetch(API_QUESTIONS_URL).then((res) => {
        if (!res.ok) {
            throw new Error('Failed to load questions!');
        }
        return res.json();
    }).then((data) => {
        if (data.response_code !== 0) {
            throw new Error(`OpenTDB error ${data.response_code}`);
        }
        return data.results;
    })
}

export function useCategoriesQuery(): UseQueryResult<TriviaCategory[], Error>{
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 60 * 60 * 1000, // 1h
    });
}

export function useQuestionsQuery(): UseQueryResult<TriviaQuestion[], Error>{
    return useQuery({
        queryKey: ['questions'],
        queryFn: fetchQuestions,
        staleTime: 60 * 60 * 1000, // 1h
    });
}