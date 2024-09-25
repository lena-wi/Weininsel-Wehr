import { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'
import LinkButton from '../components/atoms/LInkButton'
import AdminGuard from '../components/organisms/AdminGuard'

const Aktuelles = () => {
    useEffect(() => {
        getPdfTopics()
    }, [])

    async function getPdfTopics() {
        const { data } = await supabase.from('current_pdf_content').select()
        setTopics(data)
    }
    const [topics, setTopics] = useState([])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <SubPageImage />
            <TopicHeadline text={'📄 Dokumente 📄'} />
            <AdminGuard correctPassword={'1234'}>
                <div className="flex md:text-xl text-lg flex-col space-y-6">
                    {topics.map((topic, index) => (
                        <LinkButton key={index} topic={topic} />
                    ))}
                </div>
            </AdminGuard>
        </div>
    )
}

export default Aktuelles
