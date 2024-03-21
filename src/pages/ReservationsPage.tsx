import UserReservations from "./components/UserReservations";
const user = localStorage.getItem("username");

export default function ReservationsPage() {
  return (
    <div>
      <UserReservations />
    </div>
  );
}
