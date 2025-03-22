import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  ListGroup,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

const ViewPdf = () => {
  const { id } = useParams(); // Get the invoice ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [invoice, setInvoice] = useState(null); // State to store the invoice details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(""); // State to handle errors

  // Fetch invoice details from the backend
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://185.199.53.88/api/invoice/${id}`
        );
        if (response.status === 200) {
          setInvoice(response.data.data); // Set the fetched invoice to state
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setError("Failed to fetch invoice details. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchInvoice();
  }, [id]);

  // Function to handle PDF generation
  const handleGeneratePdf = async () => {
    try {
      const response = await axios.get(
        `http://185.199.53.88/api/invoice/${id}/pdf`
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to generate PDF");
      }

      const pdfBase64 = response.data.pdf;
      const binaryString = atob(pdfBase64);
      const binaryArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }

      const pdfBlob = new Blob([binaryArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `quotation_${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError(
        error.response?.data?.error ||
          "Failed to generate PDF. Please try again."
      );
    }
  };

  // Function to handle navigation to edit page
  const handleEdit = () => {
    navigate(`/invoice/edit/${id}`); // Navigate to the edit page with the invoice ID
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    ); // Show loading spinner
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error}</Alert>
      </Container>
    ); // Show error message
  }

  if (!invoice) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="warning">No invoice found.</Alert>
      </Container>
    ); // Handle case where invoice is not found
  }

  const {
    companyName,
    date,
    invoiceNumber,
    items,
    terms,
    totalPrice,
    VATAmount,
    finalAmount,
  } = invoice;

  // Format the date
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Container className="my-5">
      <Card>
        <Card.Header as="h1" className="text-center">
          Invoice Details
        </Card.Header>
        <Card.Body>
          {/* Buttons for Edit and Generate PDF */}
          <div className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={handleEdit} className="me-2">
              Edit Invoice
            </Button>
            <Button variant="success" onClick={handleGeneratePdf}>
              Generate PDF
            </Button>
          </div>

          {/* Company Details */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Company: {companyName}</Card.Title>
              <Card.Text>
                <strong>Invoice Number:</strong> {invoiceNumber}
                <br />
                <strong>Date:</strong> {formattedDate}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Items Table */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    const rowCount = 1 + item.subItems.length; // Main item + sub-items
                    return (
                      <React.Fragment key={index}>
                        {/* Main Item Row */}
                        <tr>
                          <td>{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">${item.price}</td>
                          <td className="text-end">
                            ${item.quantity * item.price}
                          </td>
                          <td
                            rowSpan={rowCount}
                            style={{ textAlign: "center" }}
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "80px", height: "auto" }}
                              />
                            )}
                          </td>
                        </tr>
                        {/* Sub-Items Rows */}
                        {item.subItems.map((subItem, subIndex) => (
                          <tr key={subItem._id}>
                            <td style={{ paddingLeft: "30px" }}>
                              {String.fromCharCode(97 + subIndex)}.{" "}
                              {subItem.name}
                            </td>
                            <td className="text-center">{subItem.quantity}</td>
                            <td className="text-end">${subItem.price}</td>
                            <td className="text-end">
                              ${subItem.quantity * subItem.price}
                            </td>
                            {/* No image cell for sub-items */}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Totals */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Totals</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Total Price:</strong> ${totalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>VAT Amount:</strong> ${VATAmount}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Final Amount:</strong> ${finalAmount}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <Card.Body>
              <Card.Title>Terms and Conditions</Card.Title>
              <ListGroup variant="flush">
                {terms.map((term, index) => (
                  <ListGroup.Item key={index}>{term}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewPdf;
