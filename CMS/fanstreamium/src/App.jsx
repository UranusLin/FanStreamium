import "./App.css";
import Web3Cms from "./components/Web3Cms";
import ClientPlatform from "./components/ClientPlatform";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <Web3Cms>Web3 CMS</Web3Cms>
          {/* <ClientPlatform>Fanstreamium</ClientPlatform> */}
        </div>
      </header>
    </div>
  );
};

export default App;
