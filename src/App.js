import "./ButtonContainer";
import "./Display";
import { ButtonContainer } from "./ButtonContainer";
import { Display } from "./Display";

function App() {
  return (
    <div>
      <main id="calculator">
        <Display />
        <ButtonContainer />
      </main>
      <p className="source-link">
        <p>Designed by Chandan Roy</p>
        <a
          href="https://github.com/croy47/Calculator"
          target="_blank"
          rel="noreferrer"
        >
          Source Code
        </a>
      </p>
    </div>
  );
}

export default App;
