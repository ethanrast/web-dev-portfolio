import { useState } from "react";
function EventPopUp({
  title,
  description,
  date,
  startTime,
  endTime,
  createdBy,
}: {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  createdBy: string;
})  {
    const [showModal, setShowModal] = useState(false);
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
                    <h4 className="modal-title">{title}</h4>
                    <span className="text-muted">Organizer: {createdBy}</span>
                </div>
                <span className="ms-auto p-2 text-muted ">{date}</span>
              </div>
              <div className="modal-body">
                <p><strong>Start Time:</strong> {startTime.split("T")[1].slice(0, 5)}</p>
                <p><strong>End Time:</strong> {endTime.split("T")[1].slice(0, 5)}</p>
                <p>{description}</p>
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
              <button
                type="button"
                className=" btn btn-link"
                onClick={() => setShowModal(true)}
              >
                Details&gt;&gt;
              </button>
        </div>

    );
}
export default EventPopUp;