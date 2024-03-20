import UserReservations from "./components/UserReservations";

export default function ReservationsPage() {
  return (
    <div>
      <h1>Welcome to the Reservations Page</h1>
      <p>
        This page is for viewing the reservations made by the user that is
        signed in. This page is of course only meant for signed in users.
      </p>
      <UserReservations />
    </div>
  );
}
