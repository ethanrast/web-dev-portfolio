import { useState, useEffect } from "react";
import PageTitle from "./PageTitle";
import { useAuth } from "../context/AuthContext";
const EventList: React.FC = () => {
    const { user } = useAuth();
    const [jsonData, setJsonData] = useState<any[]>([]);;
    const [loading, setLoading] = useState(true);

    // {
    //     "title": "React Native Essentials",
    //     "description": "Learn how to build mobile apps using React Native from scratch.",
    //     "date": "2025-12-03",
    //     "createdBy": "Frank Wilson",
    //     "attended": false
    // },
    // {
    //     "title": "Next.js in Practice",
    //     "description": "Hands-on session exploring Next.js features, SSR, and static site generation.",
    //     "date": "2025-12-07",
    //     "createdBy": "Grace Kim",
    //     "attended": false
    // },
    // {
    //     "title": "CSS Grid & Flexbox Workshop",
    //     "description": "Interactive workshop on modern CSS layout techniques.",
    //     "date": "2025-12-11",
    //     "createdBy": "Hector Nguyen",
    //     "attended": false
    // },
    // {
    //     "title": "Accessibility in Web Development",
    //     "description": "Learn how to make websites accessible to all users.",
    //     "date": "2025-12-13",
    //     "createdBy": "Isabella Torres",
    //     "attended": false
    // },
    // {
    //     "title": "Fullstack JavaScript Bootcamp",
    //     "description": "Comprehensive session on building fullstack applications with Node.js and React.",
    //     "date": "2025-12-17",
    //     "createdBy": "Jack Robinson",
    //     "attended": false
    // }
    // ])
  useEffect(() => {
  fetch('http://localhost:5189/api/Event', {
    method: 'GET',
    credentials: 'include', 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      setJsonData(data);
      console.log(data);
      console.log(user);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
});
  const [showModal, setShowModal] = useState(false);
  async function Attend(eventId: number) {

    try{
      console.log("Attending event with ID:", eventId);
      const response = await fetch(`http://localhost:5189/api/Event/${eventId}/attend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText + ' ' + response.url);
      }
    } catch (error) {
      console.error('Error attending event:', error);
    }
  }

  const [search, setSearch] = useState("");
  const filteredEvents = jsonData.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return (

      

      <div className="container col-md-8">
        <PageTitle name="All Events" />
        <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3"
        />
        <div className="eventList">
          <ul className=" list-group  ">
            { filteredEvents.map((event, index) => (
            <li key={index} className=" row justify-content-between">
                <div className="col-md-4">
                    <strong>{event.title}</strong>
                    <p className="text-muted">Organized by: {event.createdBy}</p>
                </div>
                <div className="col-md-2">{event.date}</div>
                <div className="col-md-4">{event.description}</div>
                {event.participants.some((participant: any) => participant.userId === user?.id) ? <button className="col-md-2 btn btn-success mt-2 disabled">Attended</button> :
                <button onClick={() => Attend(event.id)} className="btn col-md-2 btn-primary mt-2">Attend</button>
}
            </li>
        ))

            }
          </ul>
        </div>
      </div>
    
  );
}

export default EventList;