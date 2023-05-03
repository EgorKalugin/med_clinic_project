import { BrowserRouter, Route, Routes } from "react-router-dom";

import { entities } from "../../models/entities_mappings";
import ElementsPage from "./ElementsPage";
import CreateElement from "./CreateElement";

const Workspace = () => {
    return (
        <BrowserRouter>
            <Routes>
                {entities.map((entity, idx) => <Route path={"/" + entity} key={idx} element={<ElementsPage entity={entity} />} />)}
                {entities.map((entity, idx) => <Route path={"/" + entity + "/add"} key={idx} element={<CreateElement entity={entity} />} />)}
            </Routes>
        </BrowserRouter>
    );
}

export default Workspace;