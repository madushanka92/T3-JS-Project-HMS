import React, { useState, useEffect } from "react";
import { patientService } from "../../_services/apiService";
import { useNavigate, useParams } from "react-router-dom";

const PatientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContact: "",
    medicalHistory: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      patientService
        .getPatientById(id)
        .then((response) => {
          const data = response.data;
          const formattedDate = data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : "";
          setFormData({ ...data, dateOfBirth: formattedDate });
        })
        .catch(() => setError("Failed to load patient data."));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? patientService.updatePatient(id, formData)
      : patientService.createPatient(formData);

    apiCall
      .then(() => navigate("/patients/list"))
      .catch(() => setError("Failed to save patient."));
  };

  return (
    <div className="container">
      <h2>{id ? "Edit Patient" : "Add Patient"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                className="form-control"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Medical History</label>
              <textarea
                className="form-control"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
