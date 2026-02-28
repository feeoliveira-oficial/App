import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./route/page.routes";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;