import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Leistungspruefung from './pages/Leistungspruefung'
import Fahrzeugkunde from './pages/Fahrzeugkunde'
import Mta from './pages/Mta'
import PdfViewer from './components/molecules/PdfViewer'
import Quiz from './pages/Quiz'
import {
    FAHRZEUGKUNDE_ID,
    LEISTUNGSPRUEFUNG_ID,
    TRUPPAUSBILDUNG_ID,
    GENERAL_PDF_TABLE_NAME,
    ABC_ID,
    TEILNEHMERUNTERLAGEN_ID,
    MTA_HREF,
} from './services/topicsHelper'
import Lernunterlagen from './pages/Lernunterlagen'
import Aktuelles from './pages/Aktuelles'

function App() {
    return (
        <Router>
            <div className="weininsel-wehr-app bg-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aktuelles" element={<Aktuelles />} />
                    <Route
                        path="/lernunterlagen"
                        element={<Lernunterlagen />}
                    />
                    <Route
                        path="/leistungspruefung"
                        element={
                            <Leistungspruefung
                                sub_topic_id={LEISTUNGSPRUEFUNG_ID}
                            />
                        }
                    />
                    <Route
                        path={MTA_HREF}
                        element={<Mta sub_topic_id={TRUPPAUSBILDUNG_ID} />}
                    />
                    <Route
                        path="/fahrzeugkunde"
                        element={
                            <Fahrzeugkunde sub_topic_id={FAHRZEUGKUNDE_ID} />
                        }
                    />
                    <Route
                        path="/teilnehmerunterlagen"
                        element={
                            <PdfViewer
                                sup_topic_id={TEILNEHMERUNTERLAGEN_ID}
                                table_name={GENERAL_PDF_TABLE_NAME}
                            />
                        }
                    />
                    <Route
                        path="/abc"
                        element={
                            <Quiz
                                root_href={MTA_HREF}
                                topic_name={'Zurück zu Truppausbildung'}
                                questions_sub_topics_id={ABC_ID}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
