import { useEffect, useState } from "react";
import { fetchDepartments } from "../../../models/fetch_data";
import { ENTITY_TO_URL_MAP_POST } from "../../../models/entities_mappings";
import { useNavigate } from "react-router-dom";

const CabinetForm = () => {
    const [number, setNumber] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [description, setDescription] = useState();

    const [departmentsOptions, setDepartments] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments().then((res) => {
            setDepartments(res.map((department) => {
                return (
                    <option key={department.id} value={department.id}>{department.name}</option>
                )
            }));
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!number) {
            alert("Введите номер кабинета");
            return;
        }
        const data = {
            number: number,
            departament_id: departmentId,
            description: description
        }
        fetch(ENTITY_TO_URL_MAP_POST["cabinets"], {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Кабинет добавлен");
                navigate("/cabinets")
            } else {
                alert("Ошибка добавления кабинета");
            }
        }
        ).catch((err) => {
            console.log(err);
            alert("Ошибка добавления кабинета");
        }
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="number">Номер кабинета</label>
                <input type="number" className="form-control" id="number" onChange={(event) => setNumber(event.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="department">Отделение</label>
                <select className="form-control" id="department" onChange={(event) => setDepartmentId(event.target.value)}>
                    <option value={null}>не указано</option>
                    {departmentsOptions}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Описание</label>
                <textarea className="form-control" id="description" onChange={(event) => setDescription(event.target.value)} />
            </div>
            <button type="submit" className="btn-add">Добавить</button>
        </form>
    );
}

export default CabinetForm;