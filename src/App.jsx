import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Leistungspruefung from './pages/Leistungspruefung'
import Fahrzeugkunde from './pages/Fahrzeugkunde'
import Truppausbildung from './pages/Truppausbildung'
import PdfViewer from './components/molecules/PdfViewer'
import Quiz from './pages/Quiz'
import { useEffect, useState } from 'react'
import supabase from './services/supabaseClient'
import Header from './components/molecules/Header'
import {
    FAHRZEUGKUNDE_ID,
    LEISTUNGSPRUEFUNG_ID,
    TRUPPAUSBILDUNG_ID,
    GENERAL_PDF_TABLE_NAME,
    MTA_HREF,
    ABC_ID,
    TEILNEHMERUNTERLAGEN_ID,
    ALTERNATIVE_ANTRIEBSTECHNIKEN_ID,
    BRENNEN_UND_LOESCHEN_ID,
    FAHRZEUGKUNDE_QUIZ_ID,
    FAHRZEUGTECHNIK_ID,
    GERAETEKUNDE_ID,
    HILFELEISTUNGS_LOESCHEINSATZ_ID,
    LOESCHEINSATZ_ID,
    FUNK_ID,
    RECHTSGRUNDLAGEN_ID,
    RETTUNG_VON_PERSONEN_ID,
    SICHERN_GEGEN_ABSTURZ_ID,
    VERHALTEN_BEI_GEFAHR_ID,
    VERHALTEN_IM_EINSATZ,
    TECHNISCHE_HILFELEISTUNG_ID,
    PRUEFUNGSMODUS_ID,
} from './services/topicsHelper'
import Lernunterlagen from './pages/Lernunterlagen'
import Aktuelles from './pages/Aktuelles'

// Array of general pages
const generalPages = [
    { path: '/', element: <Home /> },
    { path: '/aktuelles', element: <Aktuelles /> },
    { path: '/lernunterlagen', element: <Lernunterlagen /> },
    {
        path: '/lernunterlagen/leistungspruefung',
        element: <Leistungspruefung sub_topic_id={LEISTUNGSPRUEFUNG_ID} />,
    },
    {
        path: MTA_HREF,
        element: <Truppausbildung sub_topic_id={TRUPPAUSBILDUNG_ID} />,
    },
    {
        path: '/lernunterlagen/fahrzeugkunde',
        element: <Fahrzeugkunde sub_topic_id={FAHRZEUGKUNDE_ID} />,
    },
    {
        path: '/lernunterlagen/truppausbildung/teilnehmerunterlagen',
        element: (
            <PdfViewer
                sub_topic_id={TEILNEHMERUNTERLAGEN_ID}
                table_name={GENERAL_PDF_TABLE_NAME}
            />
        ),
    },
]

// Array of quiz routes
const quizRoutes = [
    {
        path: '/lernunterlagen/truppausbildung/quiz/pruefungsmodus',
        id: PRUEFUNGSMODUS_ID,
    },
    { path: '/lernunterlagen/truppausbildung/quiz/abc', id: ABC_ID },
    {
        path: '/lernunterlagen/truppausbildung/quiz/antriebstechnikenautos',
        id: ALTERNATIVE_ANTRIEBSTECHNIKEN_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/brennenundloeschen',
        id: BRENNEN_UND_LOESCHEN_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/fahrzeugkunde',
        id: FAHRZEUGKUNDE_QUIZ_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/fahrzeugtechnik',
        id: FAHRZEUGTECHNIK_ID,
    },
    { path: '/lernunterlagen/truppausbildung/quiz/funk', id: FUNK_ID },
    {
        path: '/lernunterlagen/truppausbildung/quiz/geraetekunde',
        id: GERAETEKUNDE_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/hilfeleistungloescheinsatz',
        id: HILFELEISTUNGS_LOESCHEINSATZ_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/loescheinsatz',
        id: LOESCHEINSATZ_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/rechtsgrundlagen',
        id: RECHTSGRUNDLAGEN_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/rettungvonpersonen',
        id: RETTUNG_VON_PERSONEN_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/sicherngegenabsturz',
        id: SICHERN_GEGEN_ABSTURZ_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/technischehilfeleistung',
        id: TECHNISCHE_HILFELEISTUNG_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/verhaltenbeigefahr',
        id: VERHALTEN_BEI_GEFAHR_ID,
    },
    {
        path: '/lernunterlagen/truppausbildung/quiz/verhaltenimeinsatz',
        id: VERHALTEN_IM_EINSATZ,
    },
]

function App() {
    useEffect(() => {
        getCurrentTopics()
    }, [])

    async function getCurrentTopics() {
        const { data } = await supabase.from('current_pdf_content').select()
        setCurrentTopics(data)
    }

    const [currentTopics, setCurrentTopics] = useState([])

    const currentTopicPages = currentTopics.map((topic) => ({
        path: topic.href,
        element: (
            <PdfViewer
                sub_topic_id={topic.id}
                table_name={'current_pdf_content'}
                is_current_topic={true}
            />
        ),
    }))

    return (
        <Router>
            <div className="weininsel-wehr-app overflow-hidden h-screen bg-white flex flex-col">
                {/* Make the header fixed */}
                <Header className="fixed top-0 left-0 right-0" />

                {/* Main content container with margin top to account for the fixed header height */}
                <div className="flex-grow mt-6 overflow-auto">
                    <Routes>
                        {/* Render general pages */}
                        {generalPages.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}

                        {/* Render quiz routes dynamically */}
                        {quizRoutes.map(({ path, id }) => (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    <Quiz
                                        root_href={MTA_HREF}
                                        questions_sub_topics_id={id}
                                        isExamMode={id === PRUEFUNGSMODUS_ID}
                                    />
                                }
                            />
                        ))}

                        {/* Render current topic pages */}
                        {currentTopicPages.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default App
