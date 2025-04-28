"use client";

import { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

import { CalendarDays } from "lucide-react";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
        );
        if (!res.ok) {
          throw new Error("ไม่สามารถโหลดข้อมูลกิจกรรมได้");
        }
        const data = await res.json();

        const sortedEvent = (data.items || []).sort((a, b) => {
          const aDate = new Date(a.start.dateTime || a.start.date).getTime();
          const bDate = new Date(b.start.dateTime || b.start.date).getTime();
          return aDate - bDate;
        });

        setEvents(sortedEvent);
        setError(null);
      } catch (err) {
        setError(err.message || "เกิดข้อผิดพลาดขณะโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [calendarId, apiKey]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { todayEvents, upcomingEvents, pastEvents } = useMemo(() => {
    const todayList = [];
    const upcomingList = [];
    const pastList = [];

    events.forEach((event) => {
      const eventDate = new Date(event.start?.dateTime || event.start?.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === today.getTime()) {
        todayList.push({ ...event, phase: "today" });
      } else if (eventDate.getTime() > today.getTime()) {
        upcomingList.push({ ...event, phase: "upcoming" });
      } else {
        pastList.push({ ...event, phase: "past" });
      }
    });

    return {
      todayEvents: todayList,
      upcomingEvents: upcomingList.slice(0, 6),
      pastEvents: pastList.reverse().slice(0, 3),
    };
  }, [events]);

  return (
    <section id="event" className="section bg-yellow-p1">
      <div className="max-w-7xl py-12 px-4">
        <div className="section-title mb-8">
          <h2 className="text-gradient">ปฏิทินกิจกรรม</h2>
          <CalendarDays size={42} />
        </div>

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

        {/* Cards Section */}
        <div>
          {loading ? (
            <h3>กำลังโหลดกิจกรรม...</h3>
          ) : error ? (
            <h3>{error}</h3>
          ) : events.length === 0 ? (
            <h3>ไม่มีกิจกรรมในขณะนี้</h3>
          ) : (
            <div className="space-y-8">
              {/* Today Events */}
              {todayEvents.length > 0 && (
                <div>
                  <h3 className="card-event-title text-primary">
                    กิจกรรมวันนี้
                  </h3>
                  <ul className="card-event-ul">
                    {todayEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div>
                  <h3 className="card-event-title text-gd-yellow-soft">
                    กิจกรรมที่กำลังจะถึง
                  </h3>
                  <ul className="card-event-ul">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </ul>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h3 className="card-event-title text-zinc-500">
                    กิจกรรมที่ผ่านมา
                  </h3>
                  <ul className="card-event-ul">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }) {
  let titleColorClass = { title: "", text: "" };

  switch (event.phase) {
    case "today":
      titleColorClass.title = "bg-primary";
      titleColorClass.text = "text-primary";
      break;
    case "upcoming":
      titleColorClass.title = "bg-gd-yellow-soft";
      titleColorClass.text = "text-gd-yellow-soft";
      break;
    case "past":
      titleColorClass.title = "bg-zinc-500";
      titleColorClass.text = "text-zinc-500";
      break;
    default:
      titleColorClass.title = "bg-red-500";
      titleColorClass.text = "text-red-500";
  }

  return (
    <li className="max-w-sm p-4 bg-white rounded-2xl shadow-lg/50">
      <h3
        className={`text-white mb-4 rounded-2xl shadow-md/50 ${titleColorClass.title}`}
      >
        {event.summary}
      </h3>

      <div className="mb-2">
        <p className={`${titleColorClass.text} font-bold`}>
          {event.start?.dateTime
            ? new Date(event.start.dateTime).toLocaleString("th-TH", {
                dateStyle: "full",
                timeStyle: "short",
              })
            : new Date(event.start.date).toLocaleString("th-TH", {
                dateStyle: "full",
              })}
        </p>
        {event.location && <p className="italic"> ณ {event.location}</p>}
      </div>
      {event.description && <p>{event.description}</p>}
    </li>
  );
}
