import "../styling/adminuserstable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getCinemas, deleteCinema } from "../../services/apiFacade";
import { Button } from "@mui/material";
import AdminCinemaListDialog from "./AdminCinemaListDialog";
import AdminCinemaListAddCinema from "./AdminCinemaListAddCinema";
import Cinema from "../../interfaces/cinema";
import "../styling/adminuserstable.css";

export default function AdmincinemasList() {
  // Fetch data
  useEffect(() => {
    getCinemas()
      .then((res) => setCinemas(res))
      .catch(() => setError("Error fetching cinemas, is the server running?"));
  }, []);


  // State
  const [cinemas, setCinemas] = useState<Array<Cinema>>([]);
  const [error, setError] = useState("");

  // Filtering the cinemas list
  const [clickCount, setClickCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [cinemasPerPage] = useState(10);

  const indexOfLastUser = currentPage * cinemasPerPage;
  const indexOfFirstUser = indexOfLastUser - cinemasPerPage;

  // Edit dialog
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingCinema, setEditingCinema] = useState<Cinema[] | null>(null);


  const fetchCinemas = () => {
     getCinemas()
      .then((res) => setCinemas(res))
      .catch(() => setError("Error fetching cinemas, is the server running?"));
  };

  const filteredcinemas = cinemas
    .filter((user) =>
      Object.values(user).some(
        // Filter by search term
        (value) =>
          (typeof value === "string" || typeof value === "number") &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // Sorting the cinemas list
  const handleHeaderClick = (field: string) => {
    if (sortField === field) {
      if (clickCount === 2) {
        // If the field has been clicked three times in a row, remove sorting
        setSortField(null);
        setClickCount(0);
      } else {
        // If the field has been clicked twice in a row, reverse the direction
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        setClickCount(clickCount + 1);
      }
    } else {
      // If a new field is clicked, sort by that field in ascending order
      setSortField(field);
      setSortDirection("asc");
      setClickCount(1);
    }
  };

  const sortedcinemas = [...filteredcinemas].sort((a, b) => {
    if (!sortField) return 0;
    if ((a[sortField] as string) < (b[sortField] as string))
      return sortDirection === "asc" ? -1 : 1;
    if ((a[sortField] as string) > (b[sortField] as string))
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle edit user button
  const handleEditClick = (user: Cinema[]) => {
    setEditingCinema(user);
    setOpen(true);
  };

  const handleSave = () => {
    setEditingCinema(null);
    setOpen(false);
  };

  const handleAddSave = () => {
    setAddOpen(false);
    //wait 1 second before fetching the cinemas again
    setTimeout(() => {
      getCinemas()
        .then((res) => setCinemas(res))
        .catch(() => setError("Error fetching cinemas, is the server running?"));
    }, 1000);
  };

  // Search in the cinemas list
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Pagination
  const currentcinemas = sortedcinemas.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedcinemas.length / cinemasPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
  };

  // Delete and edit buttons
  const handleDeleteClick = async (username: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteCinema(username);
        // Remove the user from the local state
        setCinemas(cinemas.filter((user) => user.username !== username));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleAddUserClick = () => {
    setEditingCinema({
      name: "",
    });
    setAddOpen(true);
  };

  // Displaying the cinemas list

  const userListItems = currentcinemas.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>
        {(user.roles as unknown as { roleName: string }[])
          .map((role) => role.roleName)
          .join(", ")}
      </td>
      <td>
        <Button onClick={() => handleEditClick(user)}>
          <EditIcon />
        </Button>
      </td>
      <td>
        <Button color="error" onClick={() => handleDeleteClick(user.name)}>
          <DeleteIcon />
        </Button>
      </td>
    </tr>
  ));

  return (
    <div id="admin-users-table-container">
      <div id="admin-users-table-header">
        <label htmlFor="admin-users-search">Search:</label>
        <input
          type="text"
          id="admin-user-search"
          placeholder="Search cinemas"
          onChange={handleSearchChange}
        /> 
        <button id="admin-users-add-user" onClick={handleAddUserClick}>
          Add Cinema
        </button>
      </div>
      <table id="admin-users-table">
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick("username")}>
             Name
              {sortField === "username" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th id="users-table-edit-header">Edit Cinema</th>
            <th id="users-table-delete-header">Delete Cinema</th>
          </tr>
        </thead>
        <tbody>
          {userListItems}
          {error && <p>{error}</p>}
        </tbody>
      </table>
      <div>
        {sortedcinemas.length > cinemasPerPage &&
          pageNumbers.map((number) => (
            <button
              key={number}
              id={number.toString()}
              onClick={handlePageClick}
              className="pageButton"
            >
              {number}
            </button>
          ))}
      </div>
      <AdminCinemaListDialog
        open={open}
        onSave={handleSave}
        user={editingCinema as Cinema} // Fix: Ensure that the user prop is of type Cinema
        setCinemas={setCinemas}
        onClose={() => setOpen(false)}
      />
      <AdminCinemaListAddCinema
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
        onCinemaAdded={fetchCinemas}
      />
    </div>
  );
}
