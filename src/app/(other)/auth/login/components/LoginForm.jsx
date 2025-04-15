import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAuthContext } from "@/context/useAuthContext";
import { useNotificationContext } from "@/context/useNotificationContext";
import TextFormInput from "@/components/form/TextFormInput";
import PasswordFormInput from "@/components/form/PasswordFormInput";
import { base_url } from "../../../../../Constants/authConstant";

const loginFormSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { saveSession } = useAuthContext();
  const { showNotification } = useNotificationContext();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      console.log("Sending login request...");
      const response = await fetch(`${base_url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok && data?.success && data?.data?.token) {
        console.log("Login successful!");

        const { _id, name, email, role, token } = data.data;

        // Save user session (including role)
        saveSession({ _id, name, email, role, token });

        showNotification({
          message: "Successfully logged in. Redirecting...",
          variant: "success",
        });

        const redirectLink = "/quotation";
        setTimeout(() => navigate(redirectLink), 500);
      } else {
        console.error("Login failed:", data);
        showNotification({
          message: data.error || "Invalid email or password",
          variant: "danger",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      showNotification({
        message: "Login failed. Please try again.",
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextFormInput
        name="email"
        control={control}
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      <PasswordFormInput
        name="password"
        control={control}
        label="Password"
        placeholder="Enter your password"
      />
      <Button type="submit" disabled={loading} className="w-100 mt-3">
        {loading ? <Spinner animation="border" size="sm" /> : "Sign In"}
      </Button>
    </Form>
  );
};

export default LoginForm;
