import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import LoadingIndicator from '../atoms/LoadingIndicator'

const Calendar = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const API_KEY = import.meta.env.VITE_GOOGLE_CALENDER_API_KEY
    const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDER_ID

    useEffect(() => {
        const loadGoogleApi = () => {
            const script = document.createElement('script')
            script.src = 'https://apis.google.com/js/api.js'
            script.onload = () => {
                window.gapi.load('client', initClient)
            }
            document.body.appendChild(script)
        }

        function initClient() {
            window.gapi.client
                .init({
                    apiKey: API_KEY,
                    discoveryDocs: [
                        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
                    ],
                })
                .then(loadCalendarEvents)
                .catch((error) => {
                    console.error('Error initializing Google API client', error)
                    setLoading(false)
                })
        }

        function loadCalendarEvents() {
            const now = new Date().toISOString()
            window.gapi.client.calendar.events
                .list({
                    calendarId: CALENDAR_ID,
                    timeMin: now,
                    showDeleted: false,
                    singleEvents: true,
                    orderBy: 'startTime',
                    key: API_KEY,
                })
                .then((response) => {
                    const events = response.result.items
                    setEvents(events)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error fetching calendar events: ', error)
                    setLoading(false)
                })
        }

        loadGoogleApi()
    }, [API_KEY, CALENDAR_ID])

    // Memoize the events list to prevent unnecessary recalculations
    const renderedEvents = useMemo(() => {
        return events.map((event) => {
            const startDate = new Date(event.start.dateTime || event.start.date)
            const endDate = new Date(event.end.dateTime || event.end.date)

            return (
                <li key={event.id} className="border-b py-2 w-64">
                    <p className="text-lg">{event.summary}</p>
                    <p className="text-base">
                        {startDate.toLocaleDateString('de-DE')}{' '}
                        {startDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {endDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </li>
            )
        })
    }, [events])

    return (
        <div className="mx-auto">
            <h3 className="text-2xl font-light text-center mb-4">
                Anstehende Termine:
            </h3>
            <div className="bg-white border text-center opacity-85 shadow-md rounded-lg p-3 max-h-64 h-auto overflow-y-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    {loading ? (
                        <LoadingIndicator />
                    ) : events.length > 0 ? (
                        <ul>{renderedEvents}</ul>
                    ) : (
                        <p>Keine Termine vorhanden</p>
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default Calendar
