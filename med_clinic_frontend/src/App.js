import Header from "./components/header/Header";
import Workspace from "./components/workspace/Workspace";
import "./styles/app.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div>
          <Header />
          <Workspace />
        </div>
        {/* <Footer /> */}
      </div>
    </LocalizationProvider>
  );
}

export default App;