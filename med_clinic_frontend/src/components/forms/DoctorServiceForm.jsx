import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENTITY_TO_URL_MAP_GET, ENTITY_TO_URL_MAP_POST, ENTITY_TO_URL_MAP_PUT } from "../../models/entities_mappings";
import { fetchDoctors, fetchServices } from "../../models/fetch_data";

const DoctorServiceForm = ({ entityId }) => {
    const [doctorId, setDoctorId] = useState();
    const [serviceId, setServiceId] = useState();

    const [doctorsOptions, setDoctorsOptions] = useState();
    const [servicesOptions, setServicesOptions] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors().then((res) => {
            setDoctorsOptions(res.map((doctor) => {
                return (
                    <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
                )
            }));
        }
        ).catch((err) => {
            console.log(err);
        }
        )
        fetchServices().then((res) => {
            setServicesOptions(res.map((service) => {
                return (
                    <option key={service.id} value={service.id}>{service.name}</option>
                )
            }));
        }
        ).catch((err) => {
            console.log(err);
        }
        )
        if (entityId) {
            fetch(ENTITY_TO_URL_MAP_GET["doctor_services"] + entityId).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    alert("Ошибка получения услуги");
                }
            }).then((res) => {
                setDoctorId(res.doctor_id);
                setServiceId(res.service_id);
            }).catch((err) => {
                console.log(err);
                alert("Ошибка получения услуги");
            });
        }
    }, [entityId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!doctorId) {
            alert("Выберите врача");
            return;
        } else if (!serviceId) {
            alert("Выберите услугу");
            return;
        }
        const data = {
            doctor_id: doctorId,
            service_id: serviceId
        }
        if (entityId) {
            data.id = entityId;
        }
        let URL = entityId ? ENTITY_TO_URL_MAP_PUT["doctor_services"] + entityId : ENTITY_TO_URL_MAP_POST["doctor_services"];
        let method = entityId ? "PUT" : "POST";
        fetch(URL, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                alert("Услуга успешно " + (entityId ? "изменена" : "добавлена"));
                navigate("/doctor_services");
            } else {
                alert("Ошибка при " + (entityId ? "изменении" : "добавлении") + " услуги");
            }
        }).catch((err) => {
            console.log(err);
            alert("Ошибка при " + (entityId ? "изменении" : "добавлении") + " услуги");
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="doctorId">Доктор</label>
                <select className="form-control" id="doctorId"
                    onChange={(event) => setDoctorId(event.target.value)}
                    value={doctorId}
                >
                    {<option hidden value={undefined}>Выберите врача</option>}
                    {doctorsOptions}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="serviceId">Услуга</label>
                <select className="form-control" id="serviceId"
                    value={serviceId}
                    onChange={(event) => setServiceId(event.target.value)}
                >
                    {<option hidden value={undefined}>Выберите услугу</option>}
                    {servicesOptions}
                </select>
            </div>
            <button type="submit" className="btn-add">{entityId ? "Обновить" : "Добавить"}</button>
        </form>
    )
}

export default DoctorServiceForm;