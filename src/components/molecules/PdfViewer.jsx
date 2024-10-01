import { useState, useEffect } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import supabase from '../../services/supabaseClient'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import LoadingIndicator from '../atoms/LoadingIndicator'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString()

const PdfViewer = ({ sub_topic_id, table_name, is_current_topic = false }) => {
    const [pdfUrl, setPdfUrl] = useState(null)
    const [numPages, setNumPages] = useState(0)
    const [scale, setScale] = useState(1.0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPdfUrl = async () => {
            setLoading(true)
            setError(null)

            if (!sub_topic_id) {
                console.error('PDF ID is required to fetch the PDF URL.')
                setLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from(table_name)
                    .select('url')
                    .eq(
                        is_current_topic ? 'id' : 'pdf_content_topics_id',
                        sub_topic_id
                    )
                    .single()

                if (error || !data?.url) {
                    throw new Error(error?.message || 'PDF URL not found.')
                }

                setPdfUrl(data.url)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching PDF URL:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPdfUrl()

        const updateScale = () => {
            const width = window.outerWidth
            setScale(width > 640 ? 1.0 : width / 640)
        }

        window.addEventListener('resize', updateScale)
        updateScale() // Initial scale update

        return () => window.removeEventListener('resize', updateScale)
    }, [sub_topic_id, table_name, is_current_topic]) // Dependencies added for clarity

    const onLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    return (
        <div className="pdf-viewer bg-white w-100 flex justify-center">
            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
                    {[...Array(numPages).keys()].map((n) => (
                        <Page
                            className="flex"
                            key={n}
                            pageNumber={n + 1}
                            scale={scale}
                        />
                    ))}
                </Document>
            )}
        </div>
    )
}

export default PdfViewer
