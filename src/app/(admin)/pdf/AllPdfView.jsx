import PageTitle from "../../../components/PageTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
import riyalIcon from "../../../assets/images/riyal_icon.png";
const AllPdfView = () => {
  const [pdfs, setPdfs] = useState([]); // State to store PDFs
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [limit, setLimit] = useState(10); // State for items per page
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [invoiceToDelete, setInvoiceToDelete] = useState(null); // State to store the invoice to delete
  const [loading, setLoading] = useState(false); // State for loading during delete
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [toastVariant, setToastVariant] = useState("success"); // State for toast variant (success/error)

  // Fetch PDFs from the backend
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get(
          `http://185.199.53.88/api/invoice?page=${currentPage}&limit=${limit}&search=${searchQuery}`
        );
        if (response.status === 200) {
          setPdfs(response.data.data); // Set the fetched PDFs to state
          setTotalPages(response.data.pagination.totalPages); // Set total pages for pagination
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        showToastMessage(
          "Failed to fetch invoices. Please try again.",
          "danger"
        ); // Show error toast
      }
    };
    fetchPdfs();
  }, [currentPage, limit, searchQuery]); // Re-fetch when currentPage, limit, or searchQuery changes

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Show delete confirmation modal
  const confirmDelete = (id) => {
    setInvoiceToDelete(id); // Set the invoice ID to delete
    setShowDeleteModal(true); // Show the confirmation modal
  };

  // Handle delete invoice
  const handleDelete = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.delete(
        `http://185.199.53.88/api/invoice/${invoiceToDelete}`
      );
      if (response.status === 200) {
        // Remove the deleted invoice from the state
        setPdfs(pdfs.filter((pdf) => pdf._id !== invoiceToDelete));
        showToastMessage("Invoice deleted successfully!", "success"); // Show success toast
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      showToastMessage("Failed to delete invoice. Please try again.", "danger"); // Show error toast
    } finally {
      setLoading(false); // Stop loading
      setShowDeleteModal(false); // Close the modal
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
      <PageTitle title="All PDFs" />

      {/* Bootstrap Toast for Notifications */}
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

      {/* Bootstrap Modal for Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this invoice? This action cannot be
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
                  placeholder="Search by Company Name or Invoice Number"
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
                  to="/invoice/new" // Link to the PDF creation page
                >
                  New
                </Button>
              </Col>
            </Row>

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
                      style={{ width: "100%", textAlign: "center" }} // Stretch table and center text
                    >
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Company Name</th>
                          <th style={{ textAlign: "center" }}>Date</th>
                          <th style={{ textAlign: "center" }}>
                            Invoice Number
                          </th>
                          <th style={{ textAlign: "center" }}>Total Items</th>
                          <th style={{ textAlign: "center" }}>Total Price</th>
                          <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pdfs.map((pdf, idx) => (
                          <tr key={idx}>
                            <td style={{ verticalAlign: "middle" }}>
                              {pdf.companyName}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              {new Date(pdf.date).toLocaleDateString()}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              {pdf.invoiceNumber}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              {pdf.items.length}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <img src={riyalIcon} width={10} height={12} />
                              {pdf.totalPrice}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <Button
                                variant="info"
                                size="sm"
                                as={Link}
                                to={`/invoice/view/${pdf._id}`} // Link to view PDF details
                                style={{ marginRight: "5px", color: "white" }}
                              >
                                View
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => confirmDelete(pdf._id)} // Confirm delete
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

export default AllPdfView;
