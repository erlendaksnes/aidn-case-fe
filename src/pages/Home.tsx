import { useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/main.scss";

const API_URL = "http://localhost:5224/api/newsscore";

const Home = () => {
  const [temperature, setTemperature] = useState("");
  const [heartrate, setHeartrate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [newsScore, setNewsScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNewsScore(null);

    const requestBody = {
      measurements: [
        { type: "TEMP", value: parseFloat(temperature) },
        { type: "HR", value: parseInt(heartrate) },
        { type: "RR", value: parseInt(respiratoryRate) },
      ],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate NEWS score");
      }

      const data = await response.json();
      setNewsScore(data.score);
    } catch (err) {
      setError("Error fetching NEWS score. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>NEWS Score Calculator</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Body temperature"
          subLabel="Degrees Celsius"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
        <FormInput
          label="Heart rate"
          subLabel="Beats per minute"
          value={heartrate}
          onChange={(e) => setHeartrate(e.target.value)}
        />
        <FormInput
          label="Respiratory rate"
          subLabel="Breaths per minute"
          value={respiratoryRate}
          onChange={(e) => setRespiratoryRate(e.target.value)}
        />

        <div className="button-group">
          <button type="submit">Calculate NEWS score</button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              setTemperature("");
              setHeartrate("");
              setRespiratoryRate("");
              setNewsScore(null);
              setError(null);
            }}
          >
            Reset form
          </button>
        </div>
      </form>

      {newsScore !== null && (
        <div className="output">
          NEWS Score: <b>{newsScore}</b>
        </div>
      )}
      {error && <div className="error-output">{error}</div>}
    </div>
  );
};

export default Home;
