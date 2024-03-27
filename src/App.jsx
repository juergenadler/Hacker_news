import Header from "./components/Header";
import DataSection from "./components/DataSection";
import './index.css'

  function App() {
    return (
        <div className="flex-col h-screen justify-between  bg-neutral-900">
        <Header />
        <DataSection />
      </div>
    );
  }
  
  export default App;