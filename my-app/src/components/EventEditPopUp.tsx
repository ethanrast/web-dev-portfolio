import { useState, FormEvent, ChangeEvent } from "react";
import { useAuth } from "../context/AuthContext";

type FormValues = {
    title: string;
    description: string;
    date: string;
    starttime: string;
    endtime: string;
};
function EventEditPopUp({ event }: { event: any }) {
    const { user, isLoading } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [values, setValues] = useState<FormValues>({
        title: event.title || "",
        description: event.description || "",
        date: event.startTime?.split("T")[0] || "",
        starttime: event.startTime?.split("T")[1]?.substring(0, 5) || "",
        endtime: event.endTime?.split("T")[1]?.substring(0, 5) || "",
    });
    const payload = {
        id: event.id,
        title: values.title,
        description: values.description,
        eventDate: values.date, 
        startTime: `${values.date}T${values.starttime}:00`,
        endTime: `${values.date}T${values.endtime}:00`,
        createdBy: user?.id, 
    };
    const [submitted, setSubmitted] = useState<boolean>(false);
    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
    }
    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
        ): Promise<void> {
        e.preventDefault();



        try {
        const response = await fetch("http://localhost:5189/api/Event", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            credentials: "include"
        });

        if (!response.ok) {
            console.log(await response.text());
            throw new Error("Failed to create event");
            
        }
        if (response.ok) {
            setSubmitted(true);
            setShowModal(false);
        }
    } catch (error) {
        console.error(error);
    }
        }
    return (
        <div>
        {showModal && (
        <div className="modal fade  show " style={{ display: "block" }} role="dialog">
          <div tabIndex={1} className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex">
                <button
                  type="button"
                  className="close p-2"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <div className="p-2">
                    <h4 className="modal-title">Edit event</h4>
                </div>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" value={values.title} onChange={handleChange} className="form-control" id="title" name="title" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea className="form-control" value={values.description} onChange={handleChange} id="description" name="description" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" value={values.date} onChange={handleChange} className="form-control" id="date" name="date" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="starttime">Start Time:</label>
                        <input type="text" value={values.starttime} onChange={handleChange} className="form-control" placeholder="HH:MM" id="starttime" name="starttime" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endtime">End Time:</label>
                        <input type="text" value={values.endtime} onChange={handleChange} className="form-control" placeholder="HH:MM" id="endtime" name="endtime" required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2">Save Event</button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
                                  <button className="btn btn-primary" onClick={() => setShowModal(true)}>Edit</button>

        </div>

    );
}
export default EventEditPopUp;