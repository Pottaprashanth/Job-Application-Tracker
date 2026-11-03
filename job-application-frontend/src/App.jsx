import { useEffect, useState } from "react";

import {
    getAllApplications,
    addApplication,
    updateApplication,
    deleteApplication
} from "./services/applicationService";

import "./App.css";

function App() {

    const emptyForm = {
        applicantName: "",
        companyName: "",
        jobRole: "",
        location: "",
        applicationDate: "",
        status: "APPLIED",
        salary: ""
    };

    const [applications, setApplications] = useState([]);

    const [formData, setFormData] = useState(emptyForm);

    const [editingId, setEditingId] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // ===============================
    // LOAD APPLICATIONS
    // ===============================

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllApplications();

            setApplications(response.data);

        } catch (error) {

            console.error(error);

            setError("Unable to load applications.");

        } finally {

            setLoading(false);

        }
    };


    // ===============================
    // HANDLE INPUT
    // ===============================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ===============================
    // OPEN ADD FORM
    // ===============================

    const openAddForm = () => {

        setEditingId(null);

        setFormData(emptyForm);

        setShowForm(true);

    };


    // ===============================
    // OPEN EDIT FORM
    // ===============================

    const handleEdit = (application) => {

        setEditingId(application.id);

        setFormData({
            applicantName: application.applicantName || "",
            companyName: application.companyName || "",
            jobRole: application.jobRole || "",
            location: application.location || "",
            applicationDate: application.applicationDate || "",
            status: application.status || "APPLIED",
            salary: application.salary || ""
        });

        setShowForm(true);

    };


    // ===============================
    // SUBMIT FORM
    // ===============================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setError("");

            if (editingId) {

                await updateApplication(
                    editingId,
                    formData
                );

                alert("Application updated successfully!");

            } else {

                await addApplication(formData);

                alert("Application added successfully!");

            }

            setFormData(emptyForm);

            setEditingId(null);

            setShowForm(false);

            loadApplications();

        } catch (error) {

            console.error(error);

            setError("Unable to save application.");

        }

    };


    // ===============================
    // DELETE APPLICATION
    // ===============================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteApplication(id);

            alert("Application deleted successfully!");

            loadApplications();

        } catch (error) {

            console.error(error);

            setError("Unable to delete application.");

        }

    };


    // ===============================
    // FILTER APPLICATIONS
    // ===============================

    const filteredApplications = applications.filter(
        (application) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                application.applicantName
                    ?.toLowerCase()
                    .includes(searchText) ||

                application.companyName
                    ?.toLowerCase()
                    .includes(searchText) ||

                application.jobRole
                    ?.toLowerCase()
                    .includes(searchText) ||

                application.location
                    ?.toLowerCase()
                    .includes(searchText);


            const matchesStatus =
                statusFilter === "ALL" ||
                application.status === statusFilter;


            return matchesSearch && matchesStatus;

        }
    );


    // ===============================
    // DASHBOARD COUNTS
    // ===============================

    const totalApplications = applications.length;

    const appliedCount = applications.filter(
        (application) =>
            application.status === "APPLIED"
    ).length;

    const shortlistedCount = applications.filter(
        (application) =>
            application.status === "SHORTLISTED"
    ).length;

    const interviewCount = applications.filter(
        (application) =>
            application.status === "INTERVIEW"
    ).length;

    const rejectedCount = applications.filter(
        (application) =>
            application.status === "REJECTED"
    ).length;


    // ===============================
    // UI
    // ===============================

    return (

        <div className="app-container">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <header className="header">

                <div>

                    <h1>
                        Job Application Management
                    </h1>

                    <p>
                        Track and manage your job applications
                    </p>

                </div>

                <button
                    className="add-button"
                    onClick={openAddForm}
                >
                    + Add Application
                </button>

            </header>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {/* ================================= */}
            {/* DASHBOARD CARDS */}
            {/* ================================= */}

            <div className="dashboard-cards">

                <div className="card">

                    <div className="card-title">
                        Total Applications
                    </div>

                    <div className="card-number">
                        {totalApplications}
                    </div>

                </div>


                <div className="card">

                    <div className="card-title">
                        Applied
                    </div>

                    <div className="card-number">
                        {appliedCount}
                    </div>

                </div>


                <div className="card">

                    <div className="card-title">
                        Shortlisted
                    </div>

                    <div className="card-number">
                        {shortlistedCount}
                    </div>

                </div>


                <div className="card">

                    <div className="card-title">
                        Interview
                    </div>

                    <div className="card-number">
                        {interviewCount}
                    </div>

                </div>


                <div className="card">

                    <div className="card-title">
                        Rejected
                    </div>

                    <div className="card-number">
                        {rejectedCount}
                    </div>

                </div>

            </div>


            {/* ================================= */}
            {/* FORM */}
            {/* ================================= */}

            {showForm && (

                <div className="form-container">

                    <div className="form-header">

                        <h2>
                            {editingId
                                ? "Edit Application"
                                : "Add Application"}
                        </h2>

                        <button
                            className="close-button"
                            onClick={() => setShowForm(false)}
                        >
                            ×
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">


                            {/* Applicant */}

                            <div className="form-group">

                                <label>
                                    Applicant Name
                                </label>

                                <input
                                    type="text"
                                    name="applicantName"
                                    value={formData.applicantName}
                                    onChange={handleChange}
                                    placeholder="Enter applicant name"
                                    required
                                />

                            </div>


                            {/* Company */}

                            <div className="form-group">

                                <label>
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Enter company name"
                                    required
                                />

                            </div>


                            {/* Job Role */}

                            <div className="form-group">

                                <label>
                                    Job Role
                                </label>

                                <input
                                    type="text"
                                    name="jobRole"
                                    value={formData.jobRole}
                                    onChange={handleChange}
                                    placeholder="Enter job role"
                                    required
                                />

                            </div>


                            {/* Location */}

                            <div className="form-group">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    required
                                />

                            </div>


                            {/* Date */}

                            <div className="form-group">

                                <label>
                                    Application Date
                                </label>

                                <input
                                    type="date"
                                    name="applicationDate"
                                    value={formData.applicationDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* Status */}

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="APPLIED">
                                        APPLIED
                                    </option>

                                    <option value="SHORTLISTED">
                                        SHORTLISTED
                                    </option>

                                    <option value="INTERVIEW">
                                        INTERVIEW
                                    </option>

                                    <option value="REJECTED">
                                        REJECTED
                                    </option>

                                </select>

                            </div>


                            {/* Salary */}

                            <div className="form-group">

                                <label>
                                    Salary
                                </label>

                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="Example: 5.0 LPA"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-button"
                            >
                                {editingId
                                    ? "Update Application"
                                    : "Add Application"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ================================= */}
            {/* SEARCH + FILTER */}
            {/* ================================= */}

            <div className="toolbar">

                <input
                    className="search-input"
                    type="text"
                    placeholder="Search applicant, company, role or location..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />


                <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                >

                    <option value="ALL">
                        All Status
                    </option>

                    <option value="APPLIED">
                        Applied
                    </option>

                    <option value="SHORTLISTED">
                        Shortlisted
                    </option>

                    <option value="INTERVIEW">
                        Interview
                    </option>

                    <option value="REJECTED">
                        Rejected
                    </option>

                </select>

            </div>


            {/* ================================= */}
            {/* TABLE */}
            {/* ================================= */}

            <div className="table-container">

                <div className="table-header">

                    <h2>
                        Applications
                    </h2>

                    <span>
                        {filteredApplications.length} applications
                    </span>

                </div>


                {loading ? (

                    <div className="loading">
                        Loading applications...
                    </div>

                ) : filteredApplications.length === 0 ? (

                    <div className="empty">

                        <h3>
                            No applications found
                        </h3>

                        <p>
                            Add a new application to get started.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Applicant
                                    </th>

                                    <th>
                                        Company
                                    </th>

                                    <th>
                                        Job Role
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Salary
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredApplications.map(
                                    (application) => (

                                        <tr key={application.id}>

                                            <td>

                                                <strong>
                                                    {application.applicantName}
                                                </strong>

                                            </td>


                                            <td>
                                                {application.companyName}
                                            </td>


                                            <td>
                                                {application.jobRole}
                                            </td>


                                            <td>
                                                {application.location}
                                            </td>


                                            <td>
                                                {application.applicationDate}
                                            </td>


                                            <td>

                                                <span
                                                    className={`status ${application.status?.toLowerCase()}`}
                                                >
                                                    {application.status}
                                                </span>

                                            </td>


                                            <td>
                                                {application.salary}
                                            </td>


                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEdit(application)
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(application.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default App;