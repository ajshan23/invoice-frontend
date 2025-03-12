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
} from "react-bootstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPdfForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState(""); // Stored in YYYY-MM-DD format
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [items, setItems] = useState([]);
  const [terms, setTerms] = useState([""]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const cropperRefs = useRef({});
  const [croppedImages, setCroppedImages] = useState({});

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://185.199.53.88/api/invoice/${id}`
        );

        if (response.data.success && response.data.data) {
          const invoice = response.data.data;
          setCompanyName(invoice.companyName);
          // Set date in YYYY-MM-DD format for the input
          const formattedDate = new Date(invoice.date)
            .toISOString()
            .split("T")[0];
          setDate(formattedDate);
          setInvoiceNumber(invoice.invoiceNumber);
          setItems(invoice.items);
          setTerms(invoice.terms || [""]); // Ensure terms is an array

          const initialCropped = {};
          invoice.items.forEach((item, index) => {
            if (item.image) initialCropped[index] = true;
          });
          setCroppedImages(initialCropped);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        showToastMessage("Failed to load invoice data");
      }
    };

    fetchInvoice();
  }, [id]);

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

  const addSubItem = (itemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems.push({
      name: "",
      price: 0,
      quantity: 1,
    });
    setItems(updatedItems);
  };

  const updateSubItem = (itemIndex, subItemIndex, field, value) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].subItems[subItemIndex][field] = value;
    setItems(updatedItems);
  };

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

  const setCropperRef = (itemIndex, cropper) => {
    if (cropper) {
      cropperRefs.current[itemIndex] = cropper;
    }
  };

  const applyImageCrop = (itemIndex) => {
    const cropper = cropperRefs.current[itemIndex];
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 150, // Changed from 100 to 150
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

  const addTerm = () => {
    setTerms([...terms, ""]);
  };

  const updateTerm = (index, value) => {
    const updatedTerms = [...terms];
    updatedTerms[index] = value;
    setTerms(updatedTerms);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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
        showToastMessage("All main item fields are required.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (!item.image || !croppedImages[i]) {
        showToastMessage("Please upload and crop an image for all main items.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      for (let j = 0; j < item.subItems.length; j++) {
        const subItem = item.subItems[j];
        if (!subItem.name || !subItem.price || !subItem.quantity) {
          showToastMessage("All sub-item fields are required.");
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

    try {
      const formData = {
        companyName,
        date, // Already in YYYY-MM-DD format from input
        invoiceNumber,
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
        `http://185.199.53.88/api/invoice/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to update invoice");
      }

      // Since the backend doesn't return a PDF anymore, we can just show success
      showToastMessage("Invoice updated successfully!");
      navigate("/pdf"); // Adjust this route as needed
    } catch (error) {
      console.error("Error updating PDF:", error);
      showToastMessage(
        error.response?.data?.error ||
          "Failed to update invoice. Please try again."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
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

      <Card>
        <CardBody>
          <h4>Edit Invoice</h4>
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
              {/* Optional: Display formatted date if needed */}
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
                          aspectRatio={1 / 2} // Changed from 1/3 to 1/2 for 150x300
                          guides={true}
                          viewMode={1}
                          minCropBoxWidth={150} // Changed from 100 to 150
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
                    <FormControl
                      as="textarea"
                      rows={3}
                      placeholder="Enter term *"
                      value={term}
                      onChange={(e) => updateTerm(index, e.target.value)}
                    />
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

            <Button variant="success" onClick={handleSubmit} className="mt-3">
              Update Invoice
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default EditPdfForm;
