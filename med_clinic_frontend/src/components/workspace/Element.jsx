import "../../styles/Element.css"

import { ENTITY_TO_URL_MAP_DELETE, translateEntityFields } from "../../models/entities_mappings";

const createComponentUpdateDeleteButtons = (entity, id) => {
    return (
        <div className="element-buttons">
            id: {id}
            <div className="element-buttons-separator">
                <button className="element-button btn-with-margin">Обновить</button>
                <button className="element-button" onClick={() => onClickDelete(entity, id)}>Удалить</button>
            </div>
        </div>
    );
};

const onClickDelete = (entity, id) => {
    sendDeleteRequest(entity, id);
    window.location.reload();
}

const sendDeleteRequest = async (entity, id) => {
    const url = ENTITY_TO_URL_MAP_DELETE[entity];
    const response = await fetch(url + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        console.log(response);
        throw new Error(response.status);
    }
    const res = await response.text()
    return res;
}

const createComponent = (entity, data) => {
    return (Object.entries(data).map(([key, value], i) => {
        if (key === "id") return;
        return <div key={i} >{translateEntityFields(entity, key)}: {value}</div>;
    }
    ));
};

const Element = (props) => {
    const entity = props.entity; // string
    const data = props.data; //  object with data
    return (
        <div className="element">
            {createComponent(entity, data)}
            {createComponentUpdateDeleteButtons(entity, (entity === "cabinets" ? data.number : data.id))}
        </div>
    );
}

export default Element;