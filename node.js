import { useEffect, useState } from 'react';

export default function Home() {
  const [shoes, setShoes] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [message, setMessage] = useState('');

  // Fetch shoe data from API
  useEffect(() => {
    fetch('/api/shoes')
      .then(res => res.json())
      .then(data => setShoes(data))
      .catch(err => console.error(err));
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const result = await res.json();
    setMessage(result.message || 'Something went wrong.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', fontFamily: 'Poppins, sans-serif' }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', padding: '15px',
        background: 'linear-gradient(45deg, #333, #111)', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)'
      }}>
        <div className="logo">KickIt Shoe Outlet</div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
          <li><a href="#home" style={linkStyle}>Home</a></li>
          <li><a href="#why-buy" style={linkStyle}>Why Buy From Us</a></li>
          <li><a href="#contact" style={linkStyle}>Contact</a></li>
        </ul>
      </nav>

      <header className="hover-box">
        <h1>Welcome to KickIt Shoe Outlet</h1>
        <p>Best Deals on Luxury Shoes! Limited Time Offers.</p>
      </header>

      <section id="why-buy" className="hover-box">
        <h2>Why Buy From Us?</h2>
        <p>✔ Premium Quality Shoes at Exclusive Prices</p>
        <p>✔ Special Discounts & VIP Access</p>
        <p>✔ Ultra-Fast Delivery & 24/7 Support</p>
        <p>✔ Hassle-Free Returns & Warranty</p>
      </section>

      <section className="shoe-collection">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe">
            <img src={shoe.image_url} alt={shoe.title} />
            <div className="shoe-info">
              <h2>{shoe.title}</h2>
              <p>{shoe.description}</p>
              <div className="buttons">
                <a href={shoe.buy_link} target="_blank" className="buy">Buy Now</a>
                <button className="share" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: shoe.title,
                      url: window.location.href
                    }).catch(console.error);
                  } else {
                    alert('Sharing not supported on this browser.');
                  }
                }}>Share</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section id="contact" style={{ padding: '20px' }}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
          />
          <textarea
            placeholder="Your Message"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Send Message</button>
        </form>
        {message && <p style={{ color: 'orange' }}>{message}</p>}
      </section>

      <style jsx>{`
        .hover-box {
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 20px;
          margin: 20px;
          background: #111;
          text-align: center;
        }
        .shoe-collection {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
        }
        .shoe {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #222;
          padding: 15px;
          border-radius: 10px;
          width: 700px;
        }
        .shoe img {
          width: 40%;
          border-radius: 10px;
        }
        .shoe-info {
          width: 55%;
          padding: 10px;
        }
        .buttons {
          margin-top: 10px;
        }
        .buy {
          display: inline-block;
          padding: 10px;
          margin: 5px;
          background: linear-gradient(45deg, #ff4500, #ff6347);
          color: white;
          border: none;
          border-radius: 5px;
          text-decoration: none;
        }
        .buy:hover {
          background: linear-gradient(45deg, #ff6347, #ff4500);
        }
      `}</style>
    </div>
  );
}

const linkStyle = { color: 'white', textDecoration: 'none', fontWeight: 'bold' };
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};
const buttonStyle = {
  padding: '10px 20px',
  background: 'orange',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer'
};
