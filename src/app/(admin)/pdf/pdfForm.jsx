import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  Row,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

const PdfForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [items, setItems] = useState([]);
  const [terms, setTerms] = useState([""]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const cropperRefs = useRef({});
  const [croppedImages, setCroppedImages] = useState({});

  // Add a new main item
  const addItem = () => {
    const newItem = {
      name: "",
      price: 0,
      quantity: 1,
      image: "",
      subItems: [],
    };
    setItems([...items, newItem]);
  };

  // Remove a main item
  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Update a main item
  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    if (field === "image") {
      const updatedCroppedImages = { ...croppedImages };
      delete updatedCroppedImages[index];
      setCroppedImages(updatedCroppedImages);
    }
  };

  // Add a sub-item to a main item
  const addSubItem = (itemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems.push({
      name: "",
      price: 0,
      quantity: 1,
    });
    setItems(updatedItems);
  };

  // Remove a sub-item from a main item
  const removeSubItem = (itemIndex, subItemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems = updatedItems[itemIndex].subItems.filter(
      (_, i) => i !== subItemIndex
    );
    setItems(updatedItems);
  };

  // Update a sub-item
  const updateSubItem = (itemIndex, subItemIndex, field, value) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems[subItemIndex][field] = value;
    setItems(updatedItems);
  };

  // Handle image upload for a main item
  const handleImageUpload = (itemIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateItem(itemIndex, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save cropper reference for the item
  const setCropperRef = (itemIndex, cropper) => {
    if (cropper) {
      cropperRefs.current[itemIndex] = cropper;
    }
  };

  // Apply the crop
  const applyImageCrop = (itemIndex) => {
    const cropper = cropperRefs.current[itemIndex];
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 150,
        height: 300,
      });
      if (croppedCanvas) {
        const base64Image = croppedCanvas.toDataURL();
        updateItem(itemIndex, "image", base64Image);
        setCroppedImages({
          ...croppedImages,
          [itemIndex]: true,
        });
      }
    }
  };

  // Add a new term
  const addTerm = () => {
    setTerms([...terms, ""]);
  };

  // Remove a term
  const removeTerm = (index) => {
    const updatedTerms = terms.filter((_, i) => i !== index);
    setTerms(updatedTerms);
  };

  // Update a term
  const updateTerm = (index, value) => {
    const updatedTerms = [...terms];
    updatedTerms[index] = value;
    setTerms(updatedTerms);
  };

  // Show Toast with message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Submit the form data
  const handleSubmit = async () => {
    setShowToast(false);

    if (!companyName || !date || !invoiceNumber) {
      showToastMessage("Company Name, Date, and Invoice Number are required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (items.length === 0) {
      showToastMessage("At least one main item is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.name || !item.price || !item.quantity) {
        showToastMessage(
          "All main item fields (Name, Price, Quantity) are required."
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      for (let j = 0; j < item.subItems.length; j++) {
        const subItem = item.subItems[j];
        if (!subItem.name || !subItem.price || !subItem.quantity) {
          showToastMessage(
            "All sub-item fields (Name, Price, Quantity) are required."
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    }

    if (terms.length === 0 || terms.some((term) => !term.trim())) {
      showToastMessage("At least one term is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true); // Start loading

    try {
      const formData = {
        companyName,
        date,
        invoiceNumber,
        items: items.map((item) => ({
          name: item.name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
          image: item.image, // Image is optional
          subItems: item.subItems.map((subItem) => ({
            name: subItem.name,
            price: parseFloat(subItem.price),
            quantity: parseInt(subItem.quantity),
          })),
        })),
        terms: terms.filter((term) => term.trim()),
      };

      const response = await fetch("http://185.199.53.88/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const data = await response.json();
      if (!data.pdf) {
        throw new Error("No PDF data found in response");
      }

      const binaryString = atob(data.pdf);
      const binaryArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }

      const pdfBlob = new Blob([binaryArray], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "quotation.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      showToastMessage("PDF generated and downloaded successfully!");
      navigate("/invoice");
    } catch (error) {
      console.error("Error generating PDF:", error);
      showToastMessage("Failed to generate PDF. Please try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      <PageTitle title="Create Invoice" />
      <Card>
        <CardBody>
          <h4
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#0355a4",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
              letterSpacing: "1px",
              position: "relative",
              display: "inline-block",
              marginBottom: "20px",
            }}
          >
            Create Invoice
            <span
              style={{
                content: '""',
                position: "absolute",
                left: 0,
                bottom: "-5px",
                width: "50%",
                height: "3px",
                background: "linear-gradient(to right, #0355a4, transparent)",
              }}
            />
          </h4>
          <Form>
            <Row>
              <Col lg={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name *</Form.Label>
                  <FormControl
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date *</Form.Label>
                  <FormControl
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Invoice Number *</Form.Label>
                  <FormControl
                    placeholder="Enter invoice number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {items.map((item, itemIndex) => (
              <Card key={itemIndex} className="mb-3">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>Main Item {itemIndex + 1}</h5>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(itemIndex)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Row>
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Item Name *</Form.Label>
                        <FormControl
                          placeholder="Enter item name"
                          value={item.name}
                          onChange={(e) =>
                            updateItem(itemIndex, "name", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Price *</Form.Label>
                        <FormControl
                          type="number"
                          placeholder="Enter price"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(itemIndex, "price", e.target.value)
                          }
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Quantity *</Form.Label>
                        <FormControl
                          type="number"
                          placeholder="Enter quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(itemIndex, "quantity", e.target.value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Item Image (Optional)</Form.Label>
                        <FormControl
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(itemIndex, e)}
                        />
                      </Form.Group>

                      {item.image && (
                        <>
                          <Cropper
                            src={item.image}
                            style={{ height: 200, width: "100%" }}
                            aspectRatio={1 / 2}
                            guides={true}
                            viewMode={1}
                            minCropBoxWidth={150}
                            minCropBoxHeight={300}
                            onInitialized={(instance) =>
                              setCropperRef(itemIndex, instance)
                            }
                          />
                          <div className="mt-2 mb-2 d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              Cropping to 150x300 aspect ratio
                            </small>
                            {croppedImages[itemIndex] && (
                              <span className="text-success">
                                ✓ Image cropped
                              </span>
                            )}
                          </div>
                          <Button
                            variant="info"
                            onClick={() => applyImageCrop(itemIndex)}
                            className="mt-2"
                          >
                            Apply Crop
                          </Button>
                        </>
                      )}
                    </Col>
                  </Row>

                  {item.subItems.map((subItem, subItemIndex) => (
                    <Row key={subItemIndex} className="mt-3">
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Sub-Item Name *</Form.Label>
                          <FormControl
                            placeholder="Enter sub-item name"
                            value={subItem.name}
                            onChange={(e) =>
                              updateSubItem(
                                itemIndex,
                                subItemIndex,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Price *</Form.Label>
                          <FormControl
                            type="number"
                            placeholder="Enter price"
                            value={subItem.price}
                            onChange={(e) =>
                              updateSubItem(
                                itemIndex,
                                subItemIndex,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Quantity *</Form.Label>
                          <FormControl
                            type="number"
                            placeholder="Enter quantity"
                            value={subItem.quantity}
                            onChange={(e) =>
                              updateSubItem(
                                itemIndex,
                                subItemIndex,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={12} className="d-flex justify-content-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeSubItem(itemIndex, subItemIndex)}
                        >
                          Remove Sub-Item
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <Button
                    variant="secondary"
                    onClick={() => addSubItem(itemIndex)}
                    className="mt-2"
                  >
                    Add Sub-Item
                  </Button>
                </CardBody>
              </Card>
            ))}

            <Card className="mb-3">
              <CardBody>
                <h5>Terms and Conditions</h5>
                {terms.map((term, index) => (
                  <Row key={index} className="mb-3">
                    <Col lg={12}>
                      <Form.Group>
                        <Form.Label>Term {index + 1} *</Form.Label>
                        <FormControl
                          as="textarea"
                          rows={3}
                          placeholder="Enter term"
                          value={term}
                          onChange={(e) => updateTerm(index, e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={12} className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeTerm(index)}
                      >
                        Remove Term
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button variant="secondary" onClick={addTerm} className="mt-2">
                  Add Term
                </Button>
              </CardBody>
            </Card>

            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Button variant="primary" onClick={addItem} className="mt-3">
                Add Main Item
              </Button>
              <Button
                variant="success"
                onClick={handleSubmit}
                className="mt-3"
                disabled={loading} // Disable button when loading
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
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default PdfForm;
