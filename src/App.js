import React, { useState } from "react";
import axios from "axios";
import "./App.css";  // Import the stylesheet

function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending data to backend (Flask API)
      const response = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(response.data.prediction);
      setAccuracy(response.data.accuracy); 
    } catch (error) {
      console.error("There was an error making the prediction", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age: (5-95)</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Sex: (0 = female, 1 = male)</label>
          <input
            type="number"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Chest Pain Type (cp): (0-3)</label>
          <input
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Resting Blood Pressure (trestbps): (90-200)</label>
          <input
            type="number"
            name="trestbps"
            value={formData.trestbps}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cholesterol (chol): (100-300)</label>
          <input
            type="number"
            name="chol"
            value={formData.chol}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Fasting Blood Sugar (fbs): (0 = false, 1 = true)</label>
          <input
            type="number"
            name="fbs"
            value={formData.fbs}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Resting ECG (restecg): (0-2)</label>
          <input
            type="number"
            name="restecg"
            value={formData.restecg}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Maximum Heart Rate (thalach): (60-200)</label>
          <input
            type="number"
            name="thalach"
            value={formData.thalach}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Exercise Induced Angina (exang): (0 = no, 1 = yes)</label>
          <input
            type="number"
            name="exang"
            value={formData.exang}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Oldpeak (ST depression): (0-6)</label>
          <input
            type="number"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Slope: (0-2)</label>
          <input
            type="number"
            name="slope"
            value={formData.slope}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Number of Major Vessels (ca): (0-3)</label>
          <input
            type="number"
            name="ca"
            value={formData.ca}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Thalassemia (thal): (0-3)</label>
          <input
            type="number"
            name="thal"
            value={formData.thal}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {prediction !== null && !loading && (
        <div>
          <h2>Prediction Result:</h2>
          <p>
  {prediction === 1
    ? `Positive for Heart Disease (Accuracy: ${(accuracy * 100).toFixed(2)}%)`
    : `Negative for Heart Disease (Accuracy: ${(accuracy * 100).toFixed(2)}%)`}
</p>
        </div>
      )}
    </div>
  );
}

export default App;
