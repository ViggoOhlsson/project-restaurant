export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__main">
          <div className="footer__main--logo">
            <img src={require("../../assets/logoo.png")} alt="Logo" />
          </div>
          <h2 className="footer__main--heading">GET IN TOUCH</h2>
          <form className="footer__main--form">
            <input
              className="footer__main--form--input"
              type="email"
              placeholder="Your email"
            />
            <textarea
              className="footer__main--form--text"
              cols={20}
              rows={5}
              placeholder="Let us know how we can help you?"
            ></textarea>
            <button className="footer__main--form--button">Send</button>
          </form>
        </div>
        <div className="footer__bottom">
          <p className="footer__bottom--text">+46704452710</p>
          <p className="footer__bottom--text">Matgatan 12, 151 40</p>
          <p className="footer__bottom--text">cena.help@gmail.com</p>
          <p className="footer__bottom--text">
            <i className="fa-brands fa-instagram"></i> cenamatgatan
          </p>
        </div>
      </footer>
    </>
  );
}
