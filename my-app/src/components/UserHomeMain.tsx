import { useAuth } from "../context/AuthContext";
import NotificationsTab from "./NotificationsTab";
import PageTitle from "./PageTitle";
import UpcomingEventsTab from "./UpcomingEventsTab";

function Main() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container col-md-9 py-3 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container col-md-9 py-3">
      <PageTitle name={`Welcome, ${user?.name || 'User'}!`} />

      <div className="row">
        <NotificationsTab />
        <UpcomingEventsTab />
      </div>
    </div>
  );
}

export default Main;