import React, { useState } from "react";
import { createGrievance } from "../services/api";

function CreateGrievance() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await createGrievance(title, description, location);

    if (data.grievance) {
      alert("Grievance Submitted Successfully!");
      setTitle("");
      setDescription("");
      setLocation("");
    } else {
      alert(data.message || "Error submitting grievance");
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
          setLocation(mapLink);
        },
        () => alert("Could not get location")
      );
    } else {
      alert("Geolocation not supported");
    }
  };

  return (
    <div className="form-container">
      <div className="dashboard-header">
        <div className="dashboard-header-text">
          <h1>Create Grievance</h1>
          <p className="text-muted">Submit a new grievance with title, description, and location.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="grievance-title">Title <span className="required">*</span></label>
          <input
            id="grievance-title"
            type="text"
            placeholder="Brief title for your grievance"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grievance-description">Description <span className="required">*</span></label>
          <textarea
            id="grievance-description"
            placeholder="Describe the issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grievance-location">Location</label>
          <div className="form-row form-row-location">
            <input
              id="grievance-location"
              type="text"
              placeholder="Link or address (use Detect Location for coordinates)"
              value={location}
              readOnly
            />
            <button type="button" onClick={detectLocation} className="btn btn-outline">
              Detect Location
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-lg">
          Submit Grievance
        </button>
      </form>
    </div>
  );
}

export default CreateGrievance;
