import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'
import LinkButton from '../components/atoms/LInkButton'

const Aktuelles = () => {
    useEffect(() => {
        getPdfTopics()
    }, [])

    async function getPdfTopics() {
        const { data } = await supabase
            .from('current_pdf_content')
            .select()
            .eq('is_active', true)

        setTopics(data)
    }

    const [topics, setTopics] = useState([])

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <SubPageImage />
            <TopicHeadline text={'📄 Dokumente 📄'} />
            {topics === null ? (
                <p className="text-lg mt-4">Keine Dokumente verfügbar.</p>
            ) : (
                <div className="flex md:text-xl text-lg flex-col space-y-6 mt-4">
                    {topics.map((topic, index) => (
                        <LinkButton key={index} topic={topic} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Aktuelles
