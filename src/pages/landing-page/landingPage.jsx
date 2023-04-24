import "./landing-style.css";
import { hero } from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { menuList, introData, footerData } from "./constants";
export default function LandingPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <header>
        <span id="logo">Simple header</span>
        <nav>
          {menuList.map((item) => (
            <Link to={`/${item}`} className="nav-menu" id={item} key={item}>
              {item}
            </Link>
          ))}
          <button
            style={{ color: "red" }}
            className="nav-menu"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>
      <main>
        <section id="intro">
          <section>
            <div>
              <p id="title">{introData.title}</p>
              <p id="description">{introData.description}</p>
            </div>
            <div id="buttons-container">
              <Link className="primary-button" to="/create-product">
                {introData.createButton}
              </Link>
              <button className="transparent-button">
                {introData.watchButton}
              </button>
            </div>
          </section>
          <section id="Illustration">
            <img src={hero} alt="Gambar Illustration" />
          </section>
        </section>
        <section id="subcribe">
          <div>
            <p id="subcribe-title">Join Our Newsletter</p>
            <p id="subcribe-description">
              Tamen quem nulla quae legam multos aute sint culpa legam noster
              magna
            </p>
            <div id="input-container">
              <input type="text" id="input" />
              <button className="primary-button">Subcribe</button>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <section id="first-footer">
          <div className="footer-section">
            <p className="blue-text ARSHA">ARSHA</p>
            <p className="gray-text address">
              A108 Adam Street New York, NY 535022 United States
            </p>
            <p className="gray-text">
              <b>Phone:</b>+1 5589 55488 55
            </p>
            <p className="gray-text">
              <b>Email:</b>info@example.com
            </p>
          </div>
          {footerData.map((item, idx) => (
            <div className="footer-section" key={idx}>
              <p className="blue-text">{item.title}</p>
              <ul>
                {item.menu.map((submenu) => (
                  <li key={submenu}>{submenu}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-section">
            <p className="blue-text">Our Social Networks</p>
            <p className="darkgrey-text">
              Cras fermentum odio eu feugiat lide par naso tierra videa magna
              derita valies
            </p>
            <div id="blue-balls">
              {Array(5).map((_, idx) => (
                <span className="blue-ball" key={idx} />
              ))}
            </div>
          </div>
        </section>
        <section id="second-footer">
          <p id="copy-right">
            © Copyright <b>Arsha</b>. All Rights Reserved
          </p>
          <p id="designed-by">
            Designed by <span id="boostrap-made"> BootstrapMade </span>
          </p>
        </section>
      </footer>
    </div>
  );
}
