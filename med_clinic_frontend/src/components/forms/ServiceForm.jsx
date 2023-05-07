import { useNavigate } from "react-router-dom";
import { ENTITY_TO_URL_MAP_GET, ENTITY_TO_URL_MAP_POST, ENTITY_TO_URL_MAP_PUT } from "../../models/entities_mappings";
import { useEffect, useState } from "react";

const ServiceForm = ({ entityId }) => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [defaultDuration, setDefaultDuration] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (entityId) {
            fetch(ENTITY_TO_URL_MAP_GET["services"] + entityId).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Ошибка получения услуги");
                }
            }).then((res) => {
                setName(res.name);
                setDescription(res.description);
                setPrice(res.price);
                setDefaultDuration(res.default_duration);
            }).catch((err) => {
                console.log(err);
                alert("Ошибка получения услуги");
            });
        }
    }, [entityId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name) {
            alert("Введите название услуги");
            return;
        }
        if (!price) {
            alert("Введите цену услуги");
            return;
        }
        if (!defaultDuration) {
            alert("Введите длительность услуги");
            return;
        }
        const data = {
            name: name,
            description: description,
            price: price,
            default_duration: defaultDuration,
        }
        if (entityId) {
            data.id = entityId;
        }
        let URL = entityId ? ENTITY_TO_URL_MAP_PUT["services"]  + entityId : ENTITY_TO_URL_MAP_POST["services"];
        let method = entityId ? "PUT" : "POST";
        console.log(JSON.stringify(data));
        fetch(URL, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Услуга " + (entityId ? "изменена" : "добавлена"));
                navigate("/services");
            } else {
                alert("Ошибка " + (entityId ? "обновления" : "добавления") + " услуги");
            }
        }
        ).catch((err) => {
            console.log(err);
            alert("Ошибка " + (entityId ? "обновления" : "добавления") + " услуги");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название услуги</label>
                <input type="text" className="form-control" id="name"
                    defaultValue={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание услуги</label>
                <input type="text" className="form-control" id="description"
                    defaultValue={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Цена услуги {"(руб)"}</label>
                <input type="number" className="form-control" id="price"
                    defaultValue={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
            </div>
            <div className="form-group">
                <input type="time" className="form-control" id="duration"
                    defaultValue={defaultDuration}
                    onChange={(event) => setDefaultDuration(event.target.value)}
                />
            </div>
            <button type="submit" className="btn-add">{entityId ? "Обновить" : "Создать"}</button>
        </form>
    );
}

export default ServiceForm;