import React from 'react'
import LinkButton from '../components/atoms/LInkButton'

const ResultPage = ({ score, questions, rootHref }) => {
    const halfQuestionsLength = questions.length * 0.5
    const message =
        score < halfQuestionsLength
            ? 'Es scheint, dass du noch etwas üben musst! '
            : 'Toll gemacht! Du hast eine gute Leistung gezeigt!'

    return (
        <div className="flex w-full flex-col items-center justify-center space-y-8 p-10 bg-green">
            <div className="result-text text-3xl text-center font-bold text-black opacity-65">
                <span>Ergebnis: </span>
                <span className="text-yellow-300">{score}</span>
                <span> von {questions.length}</span>
            </div>
            <div className="text-lg text-center text-black opacity-65">
                {message}
            </div>
            <LinkButton
                topic={{
                    id: 1,
                    href: rootHref,
                    name: 'Zurück zur Übersicht',
                }}
                className="mt-4 px-4 py-2 bg-white text-blue-500 rounded shadow hover:bg-gray-200 transition"
            />
        </div>
    )
}

export default ResultPage
