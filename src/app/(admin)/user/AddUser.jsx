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
  Image,
} from "react-bootstrap";
import PageTitle from "@/components/PageTitle";
import { useAuthContext } from "@/context/useAuthContext";
import { base_url } from "@/Constants/authConstant";

const UserForm = () => {
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL params

  const isEditMode = !!id; // True if id exists (edit mode)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode); // For fetching user data

  // Redirect non-admins
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  // Fetch user data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        setFetchLoading(true);
        try {
          const response = await fetch(`${base_url}/user/${id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          if (response.ok && data.success) {
            const { name, email, role, signature } = data.data;
            setName(name);
            setEmail(email);
            setRole(role);
            if (signature) {
              setSignaturePreview(signature);
            }
          } else {
            throw new Error(data.error || "Failed to fetch user");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          showToastMessage(error.message || "Failed to fetch user.");
          navigate("/users"); // Redirect on error
        } finally {
          setFetchLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, isEditMode, user.token, navigate]);

  // Show toast message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle signature file change
  const handleSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignature(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove signature
  const handleRemoveSignature = () => {
    setSignature(null);
    setSignaturePreview(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setShowToast(false);

    // Validate inputs
    if (!name.trim()) {
      showToastMessage("Name is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!email.trim()) {
      showToastMessage("Email is required.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToastMessage("Please enter a valid email.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!isEditMode && !password.trim()) {
      showToastMessage("Password is required for new users.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (password && password.length < 6) {
      showToastMessage("Password must be at least 6 characters.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!["admin", "staff"].includes(role)) {
      showToastMessage("Please select a valid role.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);

      if (password) {
        formData.append("password", password);
      }

      if (signature) {
        formData.append("signature", signature);
      }

      const url = isEditMode
        ? `${base_url}/user/${id}`
        : `${base_url}/user/register`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToastMessage(
          isEditMode
            ? "User updated successfully!"
            : "User created successfully!"
        );
        setTimeout(() => navigate("/users"), 1000);
      } else {
        throw new Error(data.error || "Failed to save user");
      }
    } catch (error) {
      console.log(error);

      console.error(
        `Error ${isEditMode ? "updating" : "creating"} user:`,
        error
      );
      showToastMessage(
        error.message || `Failed to ${isEditMode ? "update" : "create"} user.`
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while fetching user data
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

      <PageTitle title={isEditMode ? "Edit User" : "Add User"} />

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
            {isEditMode ? "Edit User" : "Add New User"}
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
                <FormGroup className="mb-3">
                  <FormLabel>Name *</FormLabel>
                  <FormControl
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>Email *</FormLabel>
                  <FormControl
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>
                    Password {isEditMode ? "(Optional)" : "*"}
                  </FormLabel>
                  <FormControl
                    type="password"
                    placeholder={
                      isEditMode
                        ? "Enter new password (leave blank to keep current)"
                        : "Enter password (minimum 6 characters)"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <FormLabel>Role *</FormLabel>
                  <FormControl
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </FormControl>
                </FormGroup>

                {/* Signature Upload Field */}
                <FormGroup className="mb-3">
                  <FormLabel>Signature</FormLabel>
                  <FormControl
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureChange}
                  />
                  {signaturePreview && (
                    <div className="mt-2">
                      <Image
                        src={signaturePreview}
                        alt="Signature preview"
                        thumbnail
                        style={{ maxHeight: "100px" }}
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="mt-2"
                        onClick={handleRemoveSignature}
                      >
                        Remove Signature
                      </Button>
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>

            <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Button
                variant="secondary"
                onClick={() => navigate("/users")}
                className="mt-3"
              >
                Cancel
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
                  "Update User"
                ) : (
                  "Create User"
                )}
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default UserForm;
