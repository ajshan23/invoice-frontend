import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  Table,
  Spinner,
  Alert,
  Button,
  Badge,
} from "react-bootstrap";
import { base_url } from "@/Constants/authConstant";
import { useAuthContext } from "@/context/useAuthContext";

const ViewDelivery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await axios.get(`${base_url}/deliveries/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.data.success) {
          setDelivery(response.data.data);
        } else {
          throw new Error(response.data.error || "Failed to fetch delivery");
        }
      } catch (error) {
        console.error("Error fetching delivery:", error);
        setError(error.message || "Failed to fetch delivery details.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchDelivery();
    }
  }, [id, user]);

  const handleGeneratePdf = async () => {
    setPdfLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${base_url}/deliveries/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          timeout: 30000,
        }
      );
      console.log(response);

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
      a.download = `Delivery_${delivery.companyName}_${delivery.deliveryNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);
      setError(error.message || "Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/delivery-note/edit/${id}`);
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
          <Button variant="link" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!delivery) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="warning">No delivery note found.</Alert>
      </Container>
    );
  }

  const { companyName, date, deliveryNumber, items, receivedBy, createdAt } =
    delivery;

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const createdDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Container className="my-5">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Delivery Note</h1>
          <Badge bg="secondary">#{deliveryNumber}</Badge>
        </Card.Header>

        <Card.Body>
          <div className="d-flex justify-content-end gap-2 mb-4">
            <Button variant="primary" onClick={handleEdit}>
              Edit Delivery
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
                "Download PDF"
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
              <div className="row">
                <div className="col-md-6">
                  <h5>Delivery To:</h5>
                  <p className="fs-5 fw-bold">{companyName}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <p>
                    <strong>Delivery Date:</strong> {formattedDate}
                  </p>
                  <p className="text-muted small">Created on: {createdDate}</p>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Items Delivered</Card.Title>
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th className="text-center">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.description}</td>
                      <td className="text-center">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewDelivery;
