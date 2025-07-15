import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { QuestionProps } from "./types/question";

type CreateQuestionData = Pick<QuestionProps, "question">

export function useCreateQuestion(roomId: string) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateQuestionData) => {
            const response = await fetch(
                `http://localhost:3333/rooms/${roomId}/questions`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )
            const result: QuestionProps = await response.json()
            return result
        },

        onMutate({ question }) {
            const questions = queryClient.getQueryData<QuestionProps[]>([
                'get-questions',
                roomId,
            ])

            const questionsArray = questions ?? []

            const newQuestion = {
                id: crypto.randomUUID(),
                roomId,
                question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true,
            }

            queryClient.setQueryData<QuestionProps[]>(
                ['get-questions', roomId],
                [newQuestion, ...questionsArray]
            )

            return { newQuestion, questions }
        },

        onSuccess(data, _variables, context) {
            queryClient.setQueryData<QuestionProps[]>(
                ['get-questions', roomId],
                (questions) => {
                    if (!questions) {
                        return questions
                    }

                    if (!context.newQuestion) {
                        return questions
                    }

                    return questions.map((question) => {
                        if (question.id === context.newQuestion.id) {
                            return {
                                ...context.newQuestion,
                                id: data.id,
                                answer: data.answer,
                                isGeneratingAnswer: false
                            }
                        }
                        return question
                    })
                }
            )
        },

        onError(_error, _variables, context) {
            if (context?.questions) {
                queryClient.setQueryData<QuestionProps[]>(
                    ['get-questions', roomId],
                    context.questions
                )
            }
        },
    })
}