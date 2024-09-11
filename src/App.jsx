import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Leistungspruefung from './pages/Leistungspruefung'
import Fahrzeugkunde from './pages/Fahrzeugkunde'
import Mta from './pages/Mta'
import PdfViewer from './components/molecules/PdfView'
import Quiz from './pages/Quiz'
import {
    FAHRZEUGKUNDE_ID,
    LEISTUNGSPRUEFUNG_ID,
    TRUPPAUSBILDUNG_ID,
} from './services/topicsHelper'

function App() {
    return (
        <Router>
            <div className="weininsel-wehr-app bg-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/leistungspruefung"
                        element={
                            <Leistungspruefung
                                main_topics_id={LEISTUNGSPRUEFUNG_ID}
                            />
                        }
                    />
                    <Route
                        path="/truppausbildung"
                        element={<Mta main_topics_id={TRUPPAUSBILDUNG_ID} />}
                    />
                    <Route
                        path="/fahrzeugkunde"
                        element={
                            <Fahrzeugkunde main_topics_id={FAHRZEUGKUNDE_ID} />
                        }
                    />
                    <Route
                        path="/teilnehmerunterlagen"
                        element={<PdfViewer sup_topic_id={1} />}
                    />
                    <Route
                        path="/abc"
                        element={<Quiz questions_sub_topics_id={6} />}
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
