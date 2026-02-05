import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time_from: "",
    time_to: "",
  });

  const [bookingId, setBookingId] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings",
        form
      );

      alert("Бронирование создано!");
      setBookingId(response.data.booking.id);
    } catch (error) {
      alert("Ошибка при создании бронирования");
    }
  }

  function downloadPdf() {
    window.open(
      `http://127.0.0.1:8000/api/bookings/${bookingId}/pdf`,
      "_blank"
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Booking System Frontend</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Имя"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="date"
          name="date"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="time"
          name="time_from"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="time"
          name="time_to"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Забронировать</button>
      </form>

      {bookingId && (
        <div style={{ marginTop: "20px" }}>
          <h3>Бронирование #{bookingId}</h3>
          <button onClick={downloadPdf}>
            Скачать PDF подтверждение
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
