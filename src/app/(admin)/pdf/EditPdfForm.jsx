import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormControl,
  Row,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../../components/PageTitle";
import { base_url } from "../../../Constants/authConstant";
import { useAuthContext } from "../../../context/useAuthContext";

const EditPdfForm = () => {
  const { user } = useAuthContext();
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [items, setItems] = useState([]);
  const [terms, setTerms] = useState([""]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const cropperRefs = useRef({});
  const [croppedImages, setCroppedImages] = useState({});

  // Fetch invoice data when component mounts
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${base_url}/quotation/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.data.success && response.data.data) {
          const invoice = response.data.data;
          setCompanyName(invoice.companyName);
          const formattedDate = new Date(invoice.date)
            .toISOString()
            .split("T")[0];
          setDate(formattedDate);
          setInvoiceNumber(invoice.quotationNumber);
          setItems(invoice.items);
          setTerms(invoice.terms || [""]);

          const initialCropped = {};
          invoice.items.forEach((item, index) => {
            if (item.image) initialCropped[index] = true;
          });
          setCroppedImages(initialCropped);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        showToastMessage("Failed to load invoice data");
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchInvoice();
    }
  }, [id, user]);

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
    setLoading(true);

    // Form validation
    if (!companyName || !date || !invoiceNumber) {
      showToastMessage("Company Name, Date, and Invoice Number are required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
      return;
    }

    if (items.length === 0) {
      showToastMessage("At least one main item is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
      return;
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.name || !item.price || !item.quantity) {
        showToastMessage(
          "All main item fields (Name, Price, Quantity) are required."
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoading(false);
        return;
      }
      for (let j = 0; j < item.subItems.length; j++) {
        const subItem = item.subItems[j];
        if (!subItem.name || !subItem.price || !subItem.quantity) {
          showToastMessage(
            "All sub-item fields (Name, Price, Quantity) are required."
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
          setLoading(false);
          return;
        }
      }
    }

    if (terms.length === 0 || terms.some((term) => !term.trim())) {
      showToastMessage("At least one term is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLoading(false);
      return;
    }

    try {
      const formData = {
        companyName,
        date,
        quotationNumber: invoiceNumber,
        items: items.map((item) => ({
          name: item.name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
          image: item.image,
          subItems: item.subItems.map((subItem) => ({
            name: subItem.name,
            price: parseFloat(subItem.price),
            quantity: parseInt(subItem.quantity),
            _id: subItem._id,
          })),
          _id: item._id,
        })),
        terms: terms.filter((term) => term.trim()),
      };

      const response = await axios.put(
        `${base_url}/quotation/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to update invoice");
      }

      showToastMessage("Invoice updated successfully!");
      setTimeout(() => {
        navigate("/quotation");
      }, 1500);
    } catch (error) {
      console.error("Error updating invoice:", error);
      showToastMessage(
        error.response?.data?.error ||
          "Failed to update invoice. Please try again."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

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

      <PageTitle title="Edit Quotation" />

      <Card>
        <CardBody>
          <h4 className="mb-4">Edit Invoice</h4>

          <Row>
            <Col lg={12}>
              <FormControl
                placeholder="Company Name *"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mb-3"
              />

              <FormControl
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mb-3"
                required
              />

              {date && (
                <small className="text-muted mb-3 d-block">
                  Selected Date:{" "}
                  {new Date(date)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replace(/\//g, " / ")}
                </small>
              )}

              <FormControl
                placeholder="Invoice Number *"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="mb-3"
              />
            </Col>
          </Row>

          {items.map((item, itemIndex) => (
            <Card key={item._id || itemIndex} className="mb-3">
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-3">
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
                    <FormControl
                      placeholder="Item Name *"
                      value={item.name}
                      onChange={(e) =>
                        updateItem(itemIndex, "name", e.target.value)
                      }
                      className="mb-3"
                    />

                    <FormControl
                      type="number"
                      placeholder="Price *"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(itemIndex, "price", e.target.value)
                      }
                      className="mb-3"
                    />

                    <FormControl
                      type="number"
                      placeholder="Quantity *"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(itemIndex, "quantity", e.target.value)
                      }
                      className="mb-3"
                    />
                  </Col>

                  <Col lg={6}>
                    <FormControl
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(itemIndex, e)}
                      className="mb-3"
                    />

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
                  <Row key={subItem._id || subItemIndex} className="mt-3">
                    <Col lg={4}>
                      <FormControl
                        placeholder="Sub-Item Name *"
                        value={subItem.name}
                        onChange={(e) =>
                          updateSubItem(
                            itemIndex,
                            subItemIndex,
                            "name",
                            e.target.value
                          )
                        }
                        className="mb-3"
                      />
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        type="number"
                        placeholder="Price *"
                        value={subItem.price}
                        onChange={(e) =>
                          updateSubItem(
                            itemIndex,
                            subItemIndex,
                            "price",
                            e.target.value
                          )
                        }
                        className="mb-3"
                      />
                    </Col>

                    <Col lg={4}>
                      <FormControl
                        type="number"
                        placeholder="Quantity *"
                        value={subItem.quantity}
                        onChange={(e) =>
                          updateSubItem(
                            itemIndex,
                            subItemIndex,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="mb-3"
                      />
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
              <h5 className="mb-3">Terms and Conditions</h5>

              {terms.map((term, index) => (
                <Row key={index} className="mb-3">
                  <Col lg={12}>
                    <FormControl
                      as="textarea"
                      rows={3}
                      placeholder="Enter term *"
                      value={term}
                      onChange={(e) => updateTerm(index, e.target.value)}
                    />
                  </Col>

                  <Col lg={12} className="d-flex justify-content-end mt-2">
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

          <div className="d-flex gap-3 mt-4">
            <Button variant="primary" onClick={addItem}>
              Add Main Item
            </Button>

            <Button variant="success" onClick={handleSubmit} disabled={loading}>
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
                  Updating...
                </>
              ) : (
                "Update Invoice"
              )}
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default EditPdfForm;
