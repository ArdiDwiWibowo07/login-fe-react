//import css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/custom.css";


//import font awesome
import "@fortawesome/fontawesome-free/js/all.js";

export default function auth({ children }) {
  return (
    <div
      style={{
        background: "url('https://static.tumblr.com/03fbbc566b081016810402488936fbae/pqpk3dn/MRSmlzpj3/tumblr_static_bg3.png') repeat 0 0",
        WebkitAnimation : " 10s linear 0s normal none infinite animate",
        MozAnimation : "10s linear 0s normal none infinite animate",
        animation : "10s linear 0s normal none infinite animate",
        height: "100vh",
        margin : 0,
        padding : 0,
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-center h-100">{children}</div>
      </div>
    </div>
  );
}