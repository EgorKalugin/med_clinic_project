import { useNavigate } from "react-router-dom";
import { ENTITY_TO_URL_MAP_POST } from "../../../models/entities_mappings";
import { useState } from "react";
import { TimeField, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ServiceForm = () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [defaultDuration, setDefaultDuration] = useState(dayjs('2022-04-17T01:30'));

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(defaultDuration.format("HH:mm:ss"));
        return;
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
        fetch(ENTITY_TO_URL_MAP_POST["services"], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Услуга добавлена");
                navigate("/services");
            } else {
                alert("Ошибка добавления услуги");
            }
        }
        ).catch((err) => {
            console.log(err);
            alert("Ошибка добавления услуги");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название услуги</label>
                <input type="text" className="form-control" id="name" onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание услуги</label>
                <input type="text" className="form-control" id="description" onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="price">Цена услуги</label>
                <input type="number" className="form-control" id="price" onChange={(event) => setPrice(event.target.value)} />
            </div>
            <div className="form-group">
                <TimeField label="Длительность услуги" id="duration"
                    format="hh:mm:ss"
                    defaultValue={defaultDuration}
                    onChange={(newValue) => setDefaultDuration(newValue)}
                />
            </div>
            <button type="submit" className="btn-add">Добавить</button>
        </form>
    );
}

export default ServiceForm;