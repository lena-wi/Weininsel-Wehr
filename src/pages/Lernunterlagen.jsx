import React, { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import LinkButton from '../components/atoms/LInkButton'
import SubPageImage from '../components/atoms/SubPageImage'
import LoadingIndicator from '../components/atoms/LoadingIndicator'

const Lernunterlagen = ({ main_topics_id }) => {
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('topics')
                    .select()
                    .eq('is_main_topic', true)
                    .eq('is_active', true)

                if (error) throw error

                setTopics(data || [])
            } catch (err) {
                console.error('Error fetching topics:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchTopics()
    }, [])

    const renderContent = () => {
        if (loading) return <LoadingIndicator />
        if (error)
            return (
                <p className="text-lg text-red-500">
                    Fehler beim Laden der Themen.
                </p>
            )
        if (topics.length === 0)
            return <p className="text-lg mt-4">Keine Themen verfügbar.</p>

        return (
            <div className="flex md:text-xl text-lg flex-col space-y-6">
                {topics.map((topic, index) => (
                    <LinkButton key={index} topic={topic} />
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <SubPageImage />
            {renderContent()}
        </div>
    )
}

export default Lernunterlagen
