
function NotificationsTab() {
  return (
    
        <div className="notifications col-md-6">
            <h2 className="bg-dark rounded-top text-white p-2 m-0">Notifications</h2>
            <div className="notificationsList">
                <ul className="rounded-bottom list-group">
                    <li className="list-group-item">
                        <p className="notiTime">9:00</p>
                        <p>You have been added to an event!</p>
                    </li>
                    <li className="list-group-item">
                        <p className="notiTime">8:50</p>
                        <p>Your attendance request has been accepted</p>
                    </li>
                    <li className="list-group-item">
                        <p className="notiTime">8:47</p>
                        <p>You have been added to an event!</p>
                    </li>
                </ul> 

            </div>
        </div>
        
  );
}
export default NotificationsTab;