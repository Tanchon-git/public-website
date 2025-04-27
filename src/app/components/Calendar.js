"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

export default function Calendar() {
  const [events, setEvents] = useState([]);

  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
      );
      const data = await res.json();
      setEvents(data.items || []);
    }

    fetchEvents();
  }, []);

  return (
    <section id="event" className="section bg-yellow-p1">
      <div className="max-w-7xl py-12 px-4">
        <h2 className="text-gradient pb-4">ปฏิทินกิจกรรม</h2>

        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          height="auto"
          timeZone="Asia/Bangkok"
          googleCalendarApiKey={apiKey}
          events={{
            googleCalendarId: calendarId,
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          buttonText={{
            today: "TODAY",
          }}
          eventColor="white"
        />

        {events.length === 0 ? (
          <p className="text-4xl">กำลังโหลด...</p>
        ) : (
          <ul className="grid grid-row sm:grid-cols-2 md:grid-cols-3 justify-center sm:gap-4 md:gap-6">
            {events.map((event) => (
              <li
                key={event.id}
                className="max-w-sm p-4 mb-6 bg-white rounded-2xl shadow-lg/50"
              >
                <h3 className="text-white mb-4 bg-primary rounded-2xl shadow-md/50">
                  {event.summary}
                </h3>

                <div className="mb-2 ">
                  <p className="text-primary font-bold">
                    {event.start?.dateTime
                      ? new Date(event.start.dateTime).toLocaleString("th-TH", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })
                      : new Date(event.start.date).toLocaleString("th-TH", {
                          dateStyle: "full",
                        })}
                  </p>
                  {event.location && (
                    <p className="italic"> ณ {event.location}</p>
                  )}
                </div>
                {event.description && <p>{event.description}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
