import { useState, useEffect } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import supabase from '../../services/supabaseClient'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString()

const PdfViewer = ({ sup_topic_id }) => {
    const [pdfUrl, setPdfUrl] = useState(null)
    const [numPages, setNumPages] = useState(null)
    const [scale, setScale] = useState(1.0)

    useEffect(() => {
        const fetchPdfUrl = async () => {
            if (!sup_topic_id) {
                console.error('PDF ID is required to fetch the PDF URL.')
                return
            }

            const { data, error } = await supabase
                .from('pdf_content')
                .select('url')
                .eq('pdf_content_sub_topics_id', sup_topic_id)
                .single()

            if (error) {
                console.error('Error fetching PDF URL:', error)
            } else {
                setPdfUrl(data.url)
            }
        }

        fetchPdfUrl()

        const updateScale = () => {
            const width = window.outerWidth
            setScale(width > 640 ? 1.0 : width / 640)
        }

        window.addEventListener('resize', updateScale)
        updateScale()

        return () => window.removeEventListener('resize', updateScale)
    }, [])

    function onLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    return (
        <div className="pdf-viewer bg-white w-100 flex justify-center">
            {pdfUrl ? (
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
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    )
}

export default PdfViewer
