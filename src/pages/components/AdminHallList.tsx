import "../styling/adminuserstable.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { getHalls, deleteHall } from "../../services/apiFacade";
import { Button } from "@mui/material";
import AdminHallListDialog from "./AdminHallListDialog";
import AdminHallListAddHall from "./AdminHallListAddHall";
import Hall from "../../interfaces/hall";
import "../styling/adminuserstable.css";

export default function AdminHallList() {
  // Fetch data
  useEffect(() => {
    getHalls()
      .then((res) => setHalls(res))
      .catch(() => setError("Error fetching Halls, is the server running?"));
  }, []);


  // State
  const [Halls, setHalls] = useState<Array<Hall>>([]);
  const [error, setError] = useState("");

  // Filtering the Halls list
  const [clickCount, setClickCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [HallsPerPage] = useState(10);

  const indexOfLastUser = currentPage * HallsPerPage;
  const indexOfFirstUser = indexOfLastUser - HallsPerPage;

  // Edit dialog
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);


  const fetchHalls = () => {
     getHalls()
      .then((res) => setHalls(res))
      .catch(() => setError("Error fetching Halls, is the server running?"));
  };

  const filteredHalls = Halls
    .filter((user) =>
      Object.values(user).some(
        // Filter by search term
        (value) =>
          (typeof value === "string" || typeof value === "number") &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  // Sorting the Halls list
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

  const sortedHalls = [...filteredHalls].sort((a, b) => {
    if (!sortField) return 0;
    if ((a[sortField] as string) < (b[sortField] as string))
      return sortDirection === "asc" ? -1 : 1;
    if ((a[sortField] as string) > (b[sortField] as string))
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle edit user button
  const handleEditClick = (user: Hall) => {
    setEditingHall(user);
    setOpen(true);
  };

  const handleSave = () => {
    setEditingHall(null);
    setOpen(false);
  };

  const handleAddSave = () => {
    setAddOpen(false);
    //wait 1 second before fetching the Halls again
    setTimeout(() => {
      getHalls()
        .then((res) => setHalls(res))
        .catch(() => setError("Error fetching Halls, is the server running?"));
    }, 1000);
  };

  // Search in the Halls list
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Pagination
  const currentHalls = sortedHalls.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedHalls.length / HallsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
  };

  // Delete and edit buttons
  const handleDeleteClick = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await deleteHall(id);
        // Remove the user from the local state
        setHalls(Halls.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const handleAddUserClick = () => {
    setEditingHall({
      id: 0,
      name: "",
      cinema: undefined,
      rows: [],
      showings: [],
    });
    setAddOpen(true);
  };

  // Displaying the Halls list

  const hallListItems = currentHalls.map((hall, index) => (
    <tr key={index}>
      <td>{hall.id}</td>
      <td>
        <Button onClick={() => handleEditClick(hall)}>
          <EditIcon />
        </Button>
      </td>
      <td>
        <Button color="error" onClick={() => handleDeleteClick(hall.id || 0)}>
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
          placeholder="Search Halls"
          onChange={handleSearchChange}
        /> 
        <button id="admin-users-add-user" onClick={handleAddUserClick}>
          Add Hall
        </button>
      </div>
      <table id="admin-users-table">
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick("name")}>
             Name
              {sortField === "name" &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th id="users-table-edit-header">Edit Hall</th>
            <th id="users-table-delete-header">Delete Hall</th>
          </tr>
        </thead>
        <tbody>
          {hallListItems}
          {error && <p>{error}</p>}
        </tbody>
      </table>
      <div>
        {sortedHalls.length > HallsPerPage &&
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
      <AdminHallListDialog
        open={open}
        onSave={handleSave}
        user={editingHall as Hall} // Fix: Ensure that the user prop is of type Hall
        setHalls={setHalls}
        onClose={() => setOpen(false)}
        key={editingHall?.id || 0}
      />
      <AdminHallListAddHall
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
        onHallAdded={fetchHalls}
      />
    </div>
  );
}
