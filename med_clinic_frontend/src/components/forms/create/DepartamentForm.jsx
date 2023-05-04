import { useNavigate } from "react-router-dom";
import { ENTITY_TO_URL_MAP_POST } from "../../../models/entities_mappings";
import { useState } from "react";


const DepartamentForm = () => {
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name) {
            alert("Введите название отделения");
            return;
        }
        const data = {
            name: name,
            description: description,
        }
        fetch(ENTITY_TO_URL_MAP_POST["departments"], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Отделение добавлено");
                navigate("/departments");
            } else {
                alert("Ошибка добавления отделения");
            }
        }
        ).catch((err) => {
            console.log(err);
            alert("Ошибка добавления отделения");
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название отделения</label>
                <input type="text" className="form-control" id="name" onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание отделения</label>
                <input type="text" className="form-control" id="description" onChange={(event) => setDescription(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
    );
}

export default DepartamentForm;