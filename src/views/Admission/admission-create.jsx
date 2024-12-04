import React, { useState, useEffect } from "react";
import {
  admissionService,
  departmentService,
  roomService,
  patientService,
} from "../../_services/apiService";
import { useParams, useNavigate } from "react-router-dom";

const AdmissionCreateForm = () => {
  const { id } = useParams(); // Get the admission ID from the URL (for edit mode)
  const navigate = useNavigate();
  const isEditMode = !!id; // Check if it's edit mode

  const [formData, setFormData] = useState({
    patientId: "",
    roomId: "",
    departmentId: "",
    admissionDate: "",
    notes: "",
  });
  const [departments, setDepartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [patientResults, setPatientResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState("");

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [departmentsRes, roomsRes] = await Promise.all([
          departmentService.getAllDepartments(),
          roomService.getAllRooms(),
        ]);
        setDepartments(departmentsRes.data);
        setRooms(roomsRes.data);
      } catch (error) {
        console.error("Error loading dropdown data", error);
      }
    };
    fetchDropdownData();
  }, []);

  // Fetch admission data for edit
  useEffect(() => {
    if (isEditMode) {
      const fetchAdmission = async () => {
        try {
          const response = await admissionService.getAdmissionById(id);
          const { patientId, ...rest } = response.data;
          const formattedDate = new Date(rest.admissionDate)
            .toISOString()
            .slice(0, 16);
          setFormData({
            ...rest,
            patientId: patientId._id,
            roomId: rest.roomId._id,
            departmentId: rest.departmentId._id,
            admissionDate: formattedDate,
          });
          setSelectedPatientName(
            `${patientId.firstName} ${patientId.lastName}`
          );
        } catch (error) {
          console.error("Error fetching admission details", error);
        }
      };
      fetchAdmission();
    }
  }, [id, isEditMode]);

  // Handle patient search
  useEffect(() => {
    if (patientSearch.trim() === "") {
      setPatientResults([]);
      return;
    }

    const fetchPatients = async () => {
      setIsSearching(true);
      try {
        const response = await patientService.getAllPatients(
          1,
          10,
          patientSearch
        ); // Pagination: 1st page, 10 results
        setPatientResults(response.data.patients);
      } catch (error) {
        console.error("Error searching patients", error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(fetchPatients, 300); // Debounce search to reduce API calls
    return () => clearTimeout(debounce);
  }, [patientSearch]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePatientSelect = (id, name) => {
    setFormData({ ...formData, patientId: id });
    setSelectedPatientName(name);
    setPatientSearch("");
    setPatientResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await admissionService.updateAdmission(id, formData);
        alert("Admission updated successfully!");
      } else {
        await admissionService.createAdmission(formData);
        alert("Admission created successfully!");
      }
      navigate("/admissions/list"); // Redirect to list screen
    } catch (error) {
      alert(
        `Error ${isEditMode ? "updating" : "creating"} admission: ${
          error.message
        }`
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEditMode ? "Edit Admission" : "Create Admission"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Patient Search Box (Only in Create Mode) */}
        {!isEditMode && (
          <div className="mb-3">
            <label htmlFor="patientSearch" className="form-label">
              Search Patient
            </label>
            <input
              type="text"
              id="patientSearch"
              className="form-control"
              placeholder="Type to search for a patient..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
            />
            {isSearching && <div className="mt-2">Searching...</div>}
            <ul className="list-group mt-2">
              {patientResults.map((patient) => (
                <li
                  key={patient._id}
                  className="list-group-item list-group-item-action"
                  onClick={() =>
                    handlePatientSelect(
                      patient._id,
                      `${patient.firstName} ${patient.lastName}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  {patient.firstName} {patient.lastName}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Selected Patient Display */}
        {formData.patientId && (
          <div className="mb-3">
            <label className="form-label">Selected Patient</label>
            <div className="alert alert-info">
              Patient: {selectedPatientName || "Loading..."}
            </div>
          </div>
        )}

        {/* Department Dropdown */}
        <div className="mb-3">
          <label htmlFor="departmentId" className="form-label">
            Department
          </label>
          <select
            id="departmentId"
            name="departmentId"
            className="form-select"
            value={formData.departmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Room Dropdown */}
        <div className="mb-3">
          <label htmlFor="roomId" className="form-label">
            Room
          </label>
          <select
            id="roomId"
            name="roomId"
            className="form-select"
            value={formData.roomId}
            onChange={handleChange}
          >
            <option value="">Select a Room (Optional)</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.roomNumber} - {room.availabilityStatus}
              </option>
            ))}
          </select>
        </div>

        {/* Admission Date */}
        <div className="mb-3">
          <label htmlFor="admissionDate" className="form-label">
            Admission Date
          </label>
          <input
            type="datetime-local"
            id="admissionDate"
            name="admissionDate"
            className="form-control"
            value={formData.admissionDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Notes */}
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="form-control"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* Additional Fields for Edit Mode */}
        {isEditMode && (
          <>
            {/* Discharge Date */}
            <div className="mb-3">
              <label htmlFor="dischargeDate" className="form-label">
                Discharge Date
              </label>
              <input
                type="datetime-local"
                id="dischargeDate"
                name="dischargeDate"
                className="form-control"
                value={formData.dischargeDate || ""}
                onChange={handleChange}
              />
            </div>

            {/* Admission Status */}
            <div className="mb-3">
              <label htmlFor="admissionStatus" className="form-label">
                Admission Status
              </label>
              <select
                id="admissionStatus"
                name="admissionStatus"
                className="form-select"
                value={formData.admissionStatus || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Discharged">Discharged</option>
                <option value="Transferred">Transferred</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          {isEditMode ? "Update Admission" : "Create Admission"}
        </button>
      </form>
    </div>
  );
};

export default AdmissionCreateForm;
