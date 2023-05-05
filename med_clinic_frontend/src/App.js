import Header from "./components/header/Header";
import Workspace from "./components/workspace/Workspace";
import "./styles/app.css";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <Workspace />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;