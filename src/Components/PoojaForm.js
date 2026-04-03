import { useState } from "react";
import "../Stylesheet/BookPooja.css";

export default function PoojaForm() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        poojaType: "",
        date: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking Details:", formData);

        alert("Pooja booked successfully");

        setFormData({
            name: "",
            phone: "",
            email: "",
            poojaType: "",
            date: "",
            message: "",
        });
    };

    return (
        <section className="pooja-section">
            <div className="pooja-container">
                <h2 className="pooja-title">Pooja Booking</h2>

                <form className="pooja-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Pooja</label>
                        <select
                            name="poojaType"
                            value={formData.poojaType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Pooja --</option>
                            <option>Ganapathi Homam</option>
                            <option>Navagraha Pooja</option>
                            <option>Abhishekam</option>
                            <option>Archana</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Special Requests</label>
                        <textarea
                            name="message"
                            placeholder="Any special request..."
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Book Now
                    </button>
                </form>
            </div>
        </section>
    )
}
