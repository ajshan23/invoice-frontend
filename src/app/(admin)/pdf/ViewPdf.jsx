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
import riyalIcon from "../../../assets/images/riyal_icon.png";
import { base_url } from "../../../Constants/authConstant";
import { useAuthContext } from "../../../context/useAuthContext";

const ViewPdf = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext(); // Get user from auth context
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        console.log("Fetching invoice with ID:", id);
        const response = await axios.get(`${base_url}/quotation/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Add authorization header
          },
        });
        console.log("Fetch response:", response.data);
        if (response.status === 200) {
          setInvoice(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        setError("Failed to fetch invoice details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      // Only fetch if user is available
      fetchInvoice();
    }
  }, [id, user]); // Add user to dependencies

  const handleGeneratePdf = async () => {
    setPdfLoading(true);
    setError("");
    console.log("Starting PDF generation for invoice ID:", id);

    try {
      const response = await axios.get(`${base_url}/quotation/${id}/pdf`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Add authorization header
        },
        timeout: 30000,
      });

      console.log("PDF response:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to generate PDF");
      }

      const pdfBase64 = response.data.pdf;
      if (!pdfBase64) {
        throw new Error("No PDF data received from server");
      }

      const binaryString = atob(pdfBase64);
      const binaryArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }

      const pdfBlob = new Blob([binaryArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ISC Quotation_${invoice.companyName}_${invoice.quotationNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      console.log("PDF download initiated successfully");
    } catch (error) {
      console.error("PDF generation error:", error);
      setError(error.message || "Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
      console.log("PDF loading state reset");
    }
  };

  const handleEdit = () => {
    navigate(`/quotation/edit/${id}`);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error && !pdfLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">
          {error}
          <Button variant="link" onClick={handleGeneratePdf}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!invoice) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="warning">No invoice found.</Alert>
      </Container>
    );
  }

  const {
    companyName,
    date,
    quotationNumber,
    items,
    terms,
    totalPrice,
    VATAmount,
    finalAmount,
  } = invoice;

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
          <div className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={handleEdit} className="me-2">
              Edit Quotation
            </Button>
            <Button
              variant="success"
              onClick={handleGeneratePdf}
              disabled={pdfLoading}
            >
              {pdfLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Generating PDF...
                </>
              ) : (
                "Generate PDF"
              )}
            </Button>
          </div>

          {pdfLoading && (
            <Alert variant="info" className="text-center">
              Generating PDF, please wait...
            </Alert>
          )}

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Company: {companyName}</Card.Title>
              <Card.Text>
                <strong>Invoice Number:</strong> {quotationNumber}
                <br />
                <strong>Date:</strong> {formattedDate}
              </Card.Text>
            </Card.Body>
          </Card>

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
                    const rowCount = 1 + item.subItems.length;
                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{item.name}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end flex flex-row">
                            <img src={riyalIcon} width={10} height={12} />
                            {item.price}
                          </td>
                          <td className="text-end flex flex-row">
                            <img src={riyalIcon} width={10} height={12} />
                            {item.quantity * item.price}
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
                        {item.subItems.map((subItem, subIndex) => (
                          <tr key={subItem._id}>
                            <td style={{ paddingLeft: "30px" }}>
                              {String.fromCharCode(97 + subIndex)}.{" "}
                              {subItem.name}
                            </td>
                            <td className="text-center">{subItem.quantity}</td>
                            <td className="text-end flex flex-row">
                              <img src={riyalIcon} width={10} height={12} />
                              {subItem.price}
                            </td>
                            <td className="text-end flex flex-row">
                              <img src={riyalIcon} width={10} height={12} />
                              {subItem.quantity * subItem.price}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Totals</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Total Price:</strong>{" "}
                  <img src={riyalIcon} width={10} height={12} />
                  {totalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>VAT Amount:</strong>{" "}
                  <img src={riyalIcon} width={10} height={12} />
                  {VATAmount}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Final Amount:</strong>{" "}
                  <img src={riyalIcon} width={10} height={12} />
                  {finalAmount}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

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
