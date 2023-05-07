import { useEffect, useState } from "react"
import { fetchDepartments } from "../../models/fetch_data";
import { ENTITY_TO_URL_MAP_GET, ENTITY_TO_URL_MAP_POST, ENTITY_TO_URL_MAP_PUT } from "../../models/entities_mappings";
import { useNavigate } from "react-router-dom";

const DoctorForm = ({ entityId }) => {
    const [firstName, setFirstName] = useState();
    const [secondName, SetSecondName] = useState();
    const [lastName, SetLastName] = useState();
    const [dateOfBirth, SetDateOfBirth] = useState();
    const [bio, SetBio] = useState();
    const [departamentId, SetDepartamentId] = useState();

    const [departmentsOptions, setDepartmentsOptions] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments().then((res) => {
            setDepartmentsOptions(res.map((department) => {
                return (
                    <option key={department.id} value={department.id}>{department.name}</option>
                )
            }));
        }).catch((err) => {
            console.log(err);
        })
        if (entityId) {
            fetch(ENTITY_TO_URL_MAP_GET["doctors"] + entityId).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Ошибка получения доктора");
                }
            }).then((res) => {
                setFirstName(res.first_name);
                SetSecondName(res.second_name);
                SetLastName(res.last_name);
                SetDateOfBirth(res.date_of_birth);
                SetBio(res.bio);
                SetDepartamentId(res.departament_id);
            }).catch((err) => {
                console.log(err);
                alert("Ошибка получения доктора");
            });
        }
    }, [entityId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!firstName) {
            alert("Введите имя");
            return;
        } else if (!lastName) {
            alert("Введите фамилию");
            return;
        } else if (!dateOfBirth) {
            alert("Введите дату рождения");
            return;
        } else if (!departamentId) {
            alert("Выберите отделение");
            return;
        }
        const data = {
            first_name: firstName,
            second_name: secondName,
            last_name: lastName,
            date_of_birth: dateOfBirth,
            bio: bio,
            departament_id: departamentId
        }
        if (entityId) {
            data.id = entityId;
        }
        let URL = entityId ? ENTITY_TO_URL_MAP_PUT["doctors"] + entityId : ENTITY_TO_URL_MAP_POST["doctors"];
        let method = entityId ? "PUT" : "POST";
        fetch(URL, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Доктор " + (entityId ? "обновлен" : "добавлен"));
                navigate("/doctors")
            } else {
                alert("Ошибка " + (entityId ? "обновления" : "добавления") + " доктора");
            }
        }
        ).catch((err) => {
            console.log(err);
            alert("Ошибка " + (entityId ? "обновления" : "добавления") + " доктора");
        }
        );
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Имя</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Имя"
                        defaultValue={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Фамилия</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Отчество"
                        defaultValue={lastName}
                        onChange={(e) => {
                            SetLastName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secondName">Отчество</label>
                    <input type="text" className="form-control" id="secondName" placeholder="Фамилия"
                        defaultValue={secondName}
                        onChange={(e) => {
                            SetSecondName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Дата рождения</label>
                    <input type="date" className="form-control" id="dateOfBirth" placeholder="Дата рождения"
                        defaultValue={dateOfBirth}
                        onChange={(e) => {
                            SetDateOfBirth(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Биография</label>
                    <textarea type="text" className="form-control" id="bio" placeholder="Биография"
                        defaultValue={bio}
                        onChange={(e) => {
                            SetBio(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="departamentId">Отделение</label>
                    <select className="form-control" id="departamentId" placeholder="Отделение" value={departamentId}
                        defaultValue={departamentId}
                        onChange={(e) => SetDepartamentId(e.target.value)}
                    >
                        <option hidden value={undefined} >Выберите отделение</option>
                        {departmentsOptions}
                    </select>
                </div>
                <button type="submit" className="btn-add">{entityId ? "Обновить" : "Добавить"}</button>
            </form>
        </div>
    );
}

export default DoctorForm;


