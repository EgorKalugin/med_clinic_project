import "../../styles/ElementCart.css"

import { translateEntityFields } from "../../models/entities_mappings";

const createComponentUpdateDeleteButtons = (entity, id) => {
    return (
        <div className="element-cart-buttons">
            id: {id}
            <div className="element-cart-buttons-separator">
                <button className="element-cart-button">Обновить</button>
                <button className="element-cart-button">Удалить</button>
            </div>
        </div>
    );
};

const createComponent = (entity, data) => {
    return (Object.entries(data).map(([key, value], i) => {
        if (key === "id") return;
        return <div key={i} >{translateEntityFields(entity, key)}: {value}</div>;
    }
    ));
};

const ElementCart = (props) => {
    const entity = props.entity; // string
    const data = props.data; //  object with data
    return (
        <div className="element-cart">
            {createComponent(entity, data)}
            {createComponentUpdateDeleteButtons(entity, data.id)}
        </div>
    );
}

export default ElementCart;