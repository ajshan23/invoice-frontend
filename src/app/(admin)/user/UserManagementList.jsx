import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Row,
  Pagination,
  Modal,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import PageTitle from "@/components/PageTitle"; // Assuming same component as AllPdfView
import { useAuthContext } from "@/context/useAuthContext";
import { base_url } from "@/Constants/authConstant";
axios.defaults.withCredentials = true;
const UserManagement = () => {
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]); // State to store users
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [limit, setLimit] = useState(10); // State for items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // State to store the user to delete
  const [loading, setLoading] = useState(false); // State for loading during delete
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVariant, setToastVariant] = useState("success"); // State for toast variant

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/user?page=${currentPage}&limit=${limit}&search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status === 200) {
          setUsers(response.data.data); // Set the fetched users
          // setTotalPages(response.data.pagination.pages); // Set total pages
        } else {
          showToastMessage("Failed to fetch users.", "danger");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        showToastMessage(
          error.response?.data?.error || "Failed to fetch users",
          "danger"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user && isAdmin()) {
      fetchUsers();
    }
  }, [currentPage, limit, searchQuery, user]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show delete confirmation modal
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle delete user
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${base_url}/user/${userToDelete}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200 && response.data.success) {
        setUsers(users.filter((u) => u._id !== userToDelete));
        showToastMessage("User deleted successfully!", "success");
      } else {
        showToastMessage("Failed to delete user.", "danger");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToastMessage(
        error.response?.data?.error || "Failed to delete user.",
        "danger"
      );
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Show toast message
  const showToastMessage = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <div className="d-flex p-4">
      <PageTitle title="User Management" />

      {/* Toast for Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="white"
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col xs={12}>
          <div
            style={{
              width: "70vw",
              background: "white",
              border: "1px solid gray",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Row className="d-flex justify-content-between align-items-center p-2">
              <Col xs="auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Name or Email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "250px", borderRadius: 10 }}
                />
              </Col>
              <Col xs="auto">
                <Button
                  type="button"
                  variant="dark"
                  style={{ padding: "10px 20px", borderRadius: 10 }}
                  as={Link}
                  to="/users/add"
                >
                  Add User
                </Button>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <div>
                <div className="responsive-table-plugin">
                  <div className="table-rep-plugin">
                    <div
                      className="table-responsive"
                      data-pattern="priority-columns"
                    >
                      <table
                        id="tech-companies-1"
                        className="table table-striped"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: "center" }}>Name</th>
                            <th style={{ textAlign: "center" }}>Email</th>
                            <th style={{ textAlign: "center" }}>Role</th>
                            <th style={{ textAlign: "center" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user._id}>
                              <td style={{ verticalAlign: "middle" }}>
                                {user.name}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {user.email}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {user.role}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <Button
                                  variant="info"
                                  size="sm"
                                  as={Link}
                                  to={`/users/edit/${user._id}`}
                                  style={{ marginRight: "5px", color: "white" }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => confirmDelete(user._id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <Row className="mt-3">
              <Col xs={12} className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserManagement;
