
import React, { useState } from "react";
import { translateEntitySingular, translateEntityFields } from "../../models/entities_mappings";
import { getTsModelByEntity } from "../../models/models.ts";
import { useNavigate } from "react-router-dom";

const CreateElementCart = (props) => {
    const entity = props.entity;
    const [data, setData] = useState("");
    // const [description, setDescription] = useState("");
    // const [price, setPrice] = useState("");
    // const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // props.createProduct({ name, description, price, category }).then(() => {
        //   history.push("/products");
        // });
        navigate("/" + entity,);
    };
    const renderButton = (entity) => {
        return <button className="element-page-button" onClick={() => {
            navigate("/" + entity);
        }
        }> ⏎ </button >;
    }

    const renderFields = (entity) => {
        const model = getTsModelByEntity(entity, false);
        console.log(model);
        const fields = Object.getOwnPropertyNames(new model());
        console.log(fields);
        return fields.map((field, idx) => {
            if (field === "id") return;
            return (
                <div key={idx}>
                    <p>{translateEntityFields(entity, field)}</p>
                    <input
                        value={data[field]}
                        onChange={(e) => setData({ ...data, [field]: e.target.value })}
                    />
                </div>
            );
        })
    }

    return (
        <div className="workspace">
            <div id="section-title">
                <div id="section-title-text">
                    Новый {translateEntitySingular(entity).toLowerCase()}
                </div>
                {renderButton(entity)}
            </div>
            <form onSubmit={handleSubmit}>
                {renderFields(entity)}
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default CreateElementCart;
