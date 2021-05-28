import "./ButtonContainer";
import "./Display";
import { ButtonContainer } from "./ButtonContainer";
import { Display } from "./Display";
import { FaTwitter, FaFreeCodeCamp, FaGithubSquare } from "react-icons/fa";

function App() {
  return (
    <main id="calculator">
      <Display />
      <ButtonContainer />
    </main>
  );
}

export default App;
