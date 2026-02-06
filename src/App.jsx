import { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time_from: "",
    time_to: "",
  });

  const [bookingId, setBookingId] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);

  function showMessage(text, msgType = "success") {
    setMessage(text);
    setType(msgType);

    setTimeout(() => {
      setMessage("");
    }, 4000);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validateTime() {
    if (form.time_from && form.time_to) {
      return form.time_to > form.time_from;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateTime()) {
      showMessage("Время окончания должно быть позже времени начала", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings",
        form
      );

      setBookingId(response.data.booking.id);
      showMessage("Бронирование успешно создано!", "success");
    } catch (err) {
      showMessage("Ошибка при создании бронирования", "error");
    }

    setLoading(false);
  }

  function downloadPdf() {
    window.open(
      `http://127.0.0.1:8000/api/bookings/${bookingId}/pdf`,
      "_blank"
    );
  }

return (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">
          Booking System
        </h1>
        <p className="text-gray-500 mt-2">
          Создайте бронирование и получите PDF подтверждение
        </p>

        {/* Notification */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-sm font-medium ${
              type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              required
              placeholder="Введите имя"
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="example@mail.com"
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Booking Date
            </label>
            <input
              type="date"
              name="date"
              required
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                From
              </label>
              <input
                type="time"
                name="time_from"
                required
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                To
              </label>
              <input
                type="time"
                name="time_to"
                required
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Создание..." : "Забронировать"}
          </button>
        </form>

        {/* PDF Button */}
        {bookingId && (
          <div className="mt-6">
            <button
              onClick={downloadPdf}
              className="w-full py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Скачать PDF подтверждение (ID: {bookingId})
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8 text-center">
          Test Assignment for Booking System by Daniyar Toktasyn
        </p>
      </div>
    </div>
  );
}
