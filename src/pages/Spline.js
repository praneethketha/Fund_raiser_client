import Spline from "@splinetool/react-spline";
import "./Spline.css";

export default function App() {
  return (
    <div
      className="home_page"
      style={{ position: "relative", overflowX: "hidden" }}
    >
      {/* with out background */}
      {/* <Spline scene="https://draft.spline.design/LnYHhZYvYO7KE74d/scene.spline" /> */}

      {/* with background */}
      <Spline scene="https://draft.spline.design/m73DhDeFCL54xTmT/scene.spline" />

      {/* with smll size ball */}
      {/* <Spline scene="https://draft.spline.design/ie5yFYhpOvEfpTQO/scene.spline" /> */}
      <div className="home_section">
        <h1 className="home_heading">Beautifully designed web experiences</h1>
        <h3 className="sub_heading">by Praneeth kumar</h3>
        <p>Front End Developer / Backend Developer / Full Stack Developer</p>
        <button className="home_btn">Contact Me</button>
      </div>
    </div>
  );
}
