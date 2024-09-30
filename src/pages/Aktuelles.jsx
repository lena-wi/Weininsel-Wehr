import React, { useEffect, useState } from 'react'
import supabase from '../services/supabaseClient'
import SubPageImage from '../components/atoms/SubPageImage'
import TopicHeadline from '../components/atoms/Seperator'
import LinkButton from '../components/atoms/LInkButton'
import LoadingIndicator from '../components/atoms/LoadingIndicator'

const Aktuelles = () => {
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true) // Loading state for fetching data
    const [error, setError] = useState(false) // Error state

    useEffect(() => {
        const fetchPdfTopics = async () => {
            try {
                const { data, error } = await supabase
                    .from('current_pdf_content')
                    .select()

                if (error) {
                    throw error // Throw error to catch in the catch block
                }

                setTopics(data)
            } catch (err) {
                console.error('Error fetching topics:', err)
                setError(true) // Set error state
            } finally {
                setLoading(false) // Set loading to false after fetching
            }
        }

        fetchPdfTopics() // Call the async function
    }, [])

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <SubPageImage />
            <TopicHeadline text={'📄 Dokumente 📄'} />
            {loading ? ( // Show loading indicator while fetching data
                <LoadingIndicator />
            ) : error ? ( // Show error message if there's an error
                <p className="text-lg text-red-500">
                    Fehler beim Laden der Dokumente.
                </p>
            ) : topics.length === 0 ? ( // Show message if no topics are available
                <p className="text-lg mt-4">Keine Dokumente verfügbar.</p>
            ) : (
                // Show the list of topics
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
