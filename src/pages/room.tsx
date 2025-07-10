import { ArrowLeft, Radio } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { QuestionForm } from '../components/question-form'
import { QuestionsList } from '@/components/questions-list'

type RoomParams = {
    id: string
}

export function Room() {
    const params = useParams<RoomParams>()

    if (!params.id) {
        return <Navigate replace to="/" />
    }

    return (
        <div className="bg-zinc-950 w-full min-h-screen">
            <div className="mx-auto px-4 py-8 max-w-4xl container">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <Link to="/">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 size-4" />
                                Voltar ao Início
                            </Button>
                        </Link>
                        <Link to={`/room/${params.id}/audio`}>
                            <Button className="flex items-center gap-2" variant="secondary">
                                <Radio className="size-4" />
                                Gravar Áudio
                            </Button>
                        </Link>
                    </div>
                    <h1 className="mb-2 font-bold text-foreground text-3xl">
                        Sala de Perguntas
                    </h1>
                    <p className="text-muted-foreground">
                        Faça perguntas e receba respostas com IA
                    </p>
                </div>

                <div className="mb-8">
                    <QuestionForm roomId={params.id} />
                </div>

                <QuestionsList roomId={params.id} />

            </div>
        </div>
    )
}
