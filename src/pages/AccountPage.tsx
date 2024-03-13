export default function AccountPage() {
  return (
    <div>
      <h1>Welcome to the Account Page</h1>
      <p>You are currently signed in as {localStorage.getItem("username")}.</p>
    </div>
  );
}
