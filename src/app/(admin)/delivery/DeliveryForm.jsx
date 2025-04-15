import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import { useAuthContext } from "@/context/useAuthContext";
import { base_url } from "@/Constants/authConstant";

const DeliveryForm = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [deliveryNumber, setDeliveryNumber] = useState("");
  const [items, setItems] = useState([{ description: "", quantity: "" }]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEditMode && user && user.token) {
      const fetchDelivery = async () => {
        setFetchLoading(true);
        try {
          const response = await fetch(`${base_url}/deliveries/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();

          if (response.ok && data.success) {
            setCompanyName(data.data.companyName || "");
            setDate(
              data.data.date
                ? new Date(data.data.date).toISOString().split("T")[0]
                : ""
            );
            setDeliveryNumber(data.data.deliveryNumber || "");
            setItems(
              Array.isArray(data.data.items)
                ? data.data.items.map((item) => ({
                    description: item.description || "",
                    quantity: item.quantity || "",
                  }))
                : [{ description: "", quantity: "" }]
            );
          } else {
            throw new Error(data.error || "Failed to fetch delivery");
          }
        } catch (error) {
          console.error("Error fetching delivery:", error);
          showToastMessage(error.message || "Failed to fetch delivery.");
          navigate("/delivery-note");
        } finally {
          setFetchLoading(false);
        }
      };
      fetchDelivery();
    }
  }, [id, isEditMode, user, navigate]);

  const addItem = () => {
    setItems([...items, { description: "", quantity: "" }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    } else {
      showToastMessage("At least one item is required");
    }
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSubmit = async () => {
    setShowToast(false);

    // Validate inputs
    if (!companyName.trim()) {
      showToastMessage("Company Name is required.");
      return;
    }
    if (!date) {
      showToastMessage("Date is required.");
      return;
    }
    if (!deliveryNumber.trim()) {
      showToastMessage("Delivery Number is required.");
      return;
    }

    // Validate items
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.description.trim()) {
        showToastMessage(`Item ${i + 1}: Description is required.`);
        return;
      }
      if (
        !item.quantity ||
        isNaN(item.quantity) ||
        Number(item.quantity) <= 0
      ) {
        showToastMessage(`Item ${i + 1}: Quantity must be a positive number.`);
        return;
      }
    }

    setLoading(true);

    try {
      const formData = {
        companyName,
        date,
        deliveryNumber,
        items: items.map((item) => ({
          description: item.description,
          quantity: parseInt(item.quantity),
        })),
      };

      const url = isEditMode
        ? `${base_url}/deliveries/${id}`
        : `${base_url}/deliveries/generate`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (!isEditMode) {
          // PDF download logic
          if (data.pdf) {
            const binaryString = atob(data.pdf);
            const binaryArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              binaryArray[i] = binaryString.charCodeAt(i);
            }

            const pdfBlob = new Blob([binaryArray], {
              type: "application/pdf",
            });
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Delivery_Note_${companyName}_${deliveryNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
          }
        }
        showToastMessage(
          isEditMode
            ? "Delivery updated successfully!"
            : "Delivery created and downloaded successfully!"
        );
        setTimeout(() => navigate("/delivery-note"), 1000);
      } else {
        throw new Error(data.error || "Failed to save delivery");
      }
    } catch (error) {
      console.error("Error saving delivery:", error);
      showToastMessage(error.message || "Failed to save delivery.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <PageTitle title={isEditMode ? "Edit Delivery" : "Create Delivery"} />

      <Card>
        <CardBody>
          <h4 className="delivery-form-title">
            {isEditMode ? "Edit Delivery Note" : "Create Delivery Note"}
          </h4>

          <Form>
            <Row>
              <Col lg={12}>
                <FormGroup className="mb-3">
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>Date *</FormLabel>
                  <FormControl
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>Delivery Number *</FormLabel>
                  <FormControl
                    placeholder="Enter delivery number"
                    value={deliveryNumber}
                    onChange={(e) => setDeliveryNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <h5 className="mt-4">Items</h5>
            {items.map((item, index) => (
              <Card key={index} className="mb-3">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>Item {index + 1}</h6>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Row>
                    <Col lg={8}>
                      <FormGroup className="mb-3">
                        <FormLabel>Description *</FormLabel>
                        <FormControl
                          placeholder="Enter item description"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(index, "description", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={4}>
                      <FormGroup className="mb-3">
                        <FormLabel>Quantity *</FormLabel>
                        <FormControl
                          type="number"
                          min="1"
                          placeholder="Enter quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}

            <div className="d-flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate("/delivery-note")}
                className="mt-3"
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={addItem} className="mt-3">
                Add Item
              </Button>
              <Button
                variant="success"
                onClick={handleSubmit}
                className="mt-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update Delivery"
                ) : (
                  "Create Delivery"
                )}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default DeliveryForm;
