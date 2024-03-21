export default function AccountPage() {
  return (
    <div>
      <h1>Konto:</h1>
      <p>Brugernavn: {localStorage.getItem("username")}.</p>
    </div>
  );
}
