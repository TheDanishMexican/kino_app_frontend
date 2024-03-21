import UserReservations from "./components/UserReservations";
const user = localStorage.getItem("username");

export default function ReservationsPage() {
  return (
    <div>
      <p>Hej {user}</p>
      <p>Dine reservationer er her:</p>
      <UserReservations />
    </div>
  );
}
