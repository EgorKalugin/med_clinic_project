import { BrowserRouter, Route, Routes } from "react-router-dom";

import { entities } from "../../constants/entities";
import ElementsPage from "./ElementsPage";

const Workspace = () => {
    return (
        <BrowserRouter>
            <Routes>
                {entities.map((entity, idx) => <Route path={"/" + entity} key={idx} element={<ElementsPage entity={entity} />} />)}
            </Routes>
        </BrowserRouter>
    );
}

export default Workspace;