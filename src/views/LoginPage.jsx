import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "../assets/css/LoginPage.scss";
import { featureMappingService, userService } from "../_services/apiService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@hms.com");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    localStorage.clear();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    userService
      .loginUser({ email, password })
      .then((response) => {
        const { token, user } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        //
        setIsAuthenticated(true);

        featureMappingService
          .getByRoleName(user.role)
          .then((features) => {
            localStorage.setItem(
              "featureSettings",
              JSON.stringify(features.data)
            );
            navigate("/home");
          })
          .catch(() => {
            localStorage.setItem("featureSettings", []);
            navigate("/home");
          });
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100 login-contant">
        <Col md={6} lg={4} className="mx-auto">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}{" "}
              {/* Show error if any */}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
