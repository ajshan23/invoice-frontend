import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import PageTitle from "@/components/PageTitle";
import { useAuthContext } from "@/context/useAuthContext";
import { base_url } from "@/Constants/authConstant";

const DeliveryList = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deliveryToDelete, setDeliveryToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${base_url}/deliveries?page=${currentPage}&limit=${limit}&search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setDeliveries(data.data);
          setTotalPages(data.pagination.pages);
        } else {
          showToastMessage("Failed to fetch deliveries.");
        }
      } catch (error) {
        console.error("Error fetching deliveries:", error);
        showToastMessage(error.message || "Failed to fetch deliveries.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDeliveries();
    }
  }, [currentPage, searchQuery, user]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show delete confirmation modal
  const confirmDelete = (id) => {
    setDeliveryToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle delete delivery
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${base_url}/deliveries/${deliveryToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setDeliveries(deliveries.filter((d) => d._id !== deliveryToDelete));
        showToastMessage("Delivery deleted successfully!");
      } else {
        throw new Error(data.error || "Failed to delete delivery.");
      }
    } catch (error) {
      console.error("Error deleting delivery:", error);
      showToastMessage(error.message || "Failed to delete delivery.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Show toast message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="d-flex p-4">
      <PageTitle title="Deliveries" />

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
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this delivery note? This action cannot
          be undone.
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
                  placeholder="Search by Company Name or Delivery Number"
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
                  to="/delivery-note/new"
                >
                  Create Delivery
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
                            <th style={{ textAlign: "center" }}>
                              Company Name
                            </th>
                            <th style={{ textAlign: "center" }}>
                              Delivery Number
                            </th>
                            <th style={{ textAlign: "center" }}>Date</th>
                            <th style={{ textAlign: "center" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deliveries.map((delivery) => (
                            <tr key={delivery._id}>
                              <td style={{ verticalAlign: "middle" }}>
                                {delivery.companyName}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {delivery.deliveryNumber}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                {new Date(delivery.date).toLocaleDateString()}
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  as={Link}
                                  to={`/delivery-note/view/${delivery._id}`}
                                  style={{ marginRight: "5px" }}
                                >
                                  View
                                </Button>
                                <Button
                                  variant="info"
                                  size="sm"
                                  as={Link}
                                  to={`/delivery-note/edit/${delivery._id}`}
                                  style={{ marginRight: "5px", color: "white" }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => confirmDelete(delivery._id)}
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

export default DeliveryList;
