import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Leistungspruefung from './pages/Leistungspruefung'
import Fahrzeugkunde from './pages/Fahrzeugkunde'
import Mta from './pages/Mta'
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
} from './services/topicsHelper'
import Lernunterlagen from './pages/Lernunterlagen'
import Aktuelles from './pages/Aktuelles'

// Array of general pages
const generalPages = [
    { path: '/', element: <Home /> },
    { path: '/aktuelles', element: <Aktuelles /> },
    { path: '/lernunterlagen', element: <Lernunterlagen /> },
    {
        path: '/leistungspruefung',
        element: <Leistungspruefung sub_topic_id={LEISTUNGSPRUEFUNG_ID} />,
    },
    { path: MTA_HREF, element: <Mta sub_topic_id={TRUPPAUSBILDUNG_ID} /> },
    {
        path: '/fahrzeugkunde',
        element: <Fahrzeugkunde sub_topic_id={FAHRZEUGKUNDE_ID} />,
    },
    {
        path: '/teilnehmerunterlagen',
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
    { path: '/quiz/abc', id: ABC_ID },
    {
        path: '/quiz/antriebstechnikenautos',
        id: ALTERNATIVE_ANTRIEBSTECHNIKEN_ID,
    },
    { path: '/quiz/brennenundloeschen', id: BRENNEN_UND_LOESCHEN_ID },
    { path: '/quiz/fahrzeugkunde', id: FAHRZEUGKUNDE_QUIZ_ID },
    { path: '/quiz/fahrzeugtechnik', id: FAHRZEUGTECHNIK_ID },
    { path: '/quiz/funk', id: FUNK_ID },
    { path: '/quiz/geraetekunde', id: GERAETEKUNDE_ID },
    {
        path: '/quiz/hilfeleistungloescheinsatz',
        id: HILFELEISTUNGS_LOESCHEINSATZ_ID,
    },
    { path: '/quiz/loescheinsatz', id: LOESCHEINSATZ_ID },
    { path: '/quiz/rechtsgrundlagen', id: RECHTSGRUNDLAGEN_ID },
    { path: '/quiz/rettungvonpersonen', id: RETTUNG_VON_PERSONEN_ID },
    { path: '/quiz/sicherngegenabsturz', id: SICHERN_GEGEN_ABSTURZ_ID },
    { path: '/quiz/technischehilfeleistung', id: TECHNISCHE_HILFELEISTUNG_ID },
    { path: '/quiz/verhaltenbeigefahr', id: VERHALTEN_BEI_GEFAHR_ID },
    { path: '/quiz/verhaltenimeinsatz', id: VERHALTEN_IM_EINSATZ },
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
            <div className="weininsel-wehr-app bg-green">
                <Header />
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
                                    topic_name={'Zurück zu Truppausbildung'}
                                    questions_sub_topics_id={id}
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
        </Router>
    )
}

export default App
