import React, { useState, useEffect } from 'react'
import { gapi } from 'gapi-script'

const Calendar = () => {
    const [events, setEvents] = useState([])

    // Google Calendar API credentials
    const API_KEY = import.meta.env.VITE_GOOGLE_CALENDER_API_KEY
    const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDER_ID // Calendar ID (should be public)

    useEffect(() => {
        function loadCalendarEvents() {
            const now = new Date().toISOString()
            gapi.client.calendar.events
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
                })
                .catch((error) => {
                    console.error('Error fetching calendar events: ', error)
                })
        }

        function initClient() {
            gapi.client
                .init({
                    apiKey: API_KEY,
                    discoveryDocs: [
                        'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
                    ],
                })
                .then(() => {
                    loadCalendarEvents() // Call function to load events
                })
                .catch((error) => {
                    console.error('Error initializing Google API client', error)
                })
        }

        gapi.load('client', initClient)
    }, [API_KEY, CALENDAR_ID])

    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-light text-center mb-4">
                Anstehende Termine:
            </h2>
            <div className="bg-white shadow-md rounded-lg p-3 h-72 overflow-y-auto">
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => {
                            const startDate = new Date(
                                event.start.dateTime || event.start.date
                            )
                            const endDate = new Date(
                                event.end.dateTime || event.end.date
                            )
                            return (
                                <li
                                    key={event.id}
                                    className="border-b py-2 w-64"
                                >
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
                        })}
                    </ul>
                ) : (
                    <p>Keine Termine in den nächsten 4 Wochen</p>
                )}
            </div>
        </div>
    )
}

export default Calendar
