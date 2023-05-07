import AppointmentRecordForm from "../components/forms/AppointmentRecordForm";
import CabinetForm from "../components/forms/CabinetForm";
import ConsumerForm from "../components/forms/ConsumerForm";
import DepartamentForm from "../components/forms/DepartamentForm";
import DoctorForm from "../components/forms/DoctorForm";
import DoctorServiceForm from "../components/forms/DoctorServiceForm";
import ServiceForm from "../components/forms/ServiceForm";

export const entities = [
    "appointment_records",
    "cabinets",
    "consumers",
    "departments",
    "doctor_services",
    "doctors",
    "services",
];

// URLS for requests to backend
const BACKEND_URL = 'http://localhost:8000';
export const ENTITY_TO_URL_MAP_GET = {
    "appointment_records": BACKEND_URL + "/appointment_record/",
    "cabinets": BACKEND_URL + "/cabinet/",
    "consumers": BACKEND_URL + "/consumer/",
    "departments": BACKEND_URL + "/departments/",
    "doctor_services": BACKEND_URL + "/doctor_service/",
    "doctors": BACKEND_URL + "/doctor/",
    "services": BACKEND_URL + "/service/",
};

export const ENTITY_TO_URL_MAP_POST = ENTITY_TO_URL_MAP_GET;
export const ENTITY_TO_URL_MAP_PUT = ENTITY_TO_URL_MAP_GET;
export const ENTITY_TO_URL_MAP_DELETE = ENTITY_TO_URL_MAP_GET;
// ======================================================

export const translateEntityPlural = (entity) => {
    switch (entity) {
        case "appointment_records":
            return "Записи на прием";
        case "cabinets":
            return "Кабинеты";
        case "consumers":
            return "Пациенты";
        case "departments":
            return "Отделения";
        case "doctor_services":
            return "Услуги врачей";
        case "doctors":
            return "Врачи";
        case "services":
            return "Услуги";
        default:
            return entity;
    }
}

export const translateEntityForAddText = (entity) => {
    switch (entity) {
        case "appointment_records":
            return "Запись на прием";
        case "cabinets":
            return "Кабинет";
        case "consumers":
            return "Пациента";
        case "departments":
            return "Отделение";
        case "doctor_services":
            return "Услугу врача";
        case "doctors":
            return "Врача";
        case "services":
            return "Услугу";
        default:
            return entity;
    }
}

// export const ENTITY_TO_FIELDS_MAP = {
//     "appointment_records": [
//         "id",
//         "consumer_id",
//         "doctor_id",
//         "service_id",
//         "start_time",
//         "end_time",
//         "price",
//         "state",
//         "cabinet_number",
//     ],
//     "cabinets":
//         [
//             "number",
//             "description",
//             "departament_id",
//         ],
//     "consumers":
//         [
//             "id",
//             "bio",
//             "date_of_birth",
//             "first_name",
//             "second_name",
//             "last_name",
//             "phone_number",
//             "email",
//             "individual_sale",
//         ],
//     "departments":
//         [
//             "id",
//             "name",
//             "description",
//         ],
//     "doctor_services":
//         [
//             "id",
//             "doctor_id",
//             "service_id",
//         ],
//     "doctors":
//         [
//             "id",
//             "departament_id",
//             "bio",
//             "first_name",
//             "second_name",
//             "last_name",
//             "date_of_birth",
//         ],
//     "services":
//         [
//             "id",
//             "name",
//             "description",
//             "price",
//             "default_duration",
//         ],
// };

export const translateEntityFields = (entity, field) => {
    switch (entity) {
        case "appointment_records":
            switch (field) {
                case "id":
                    return "ID";
                case "consumer_id":
                    return "ID пациента";
                case "doctor_id":
                    return "ID врача";
                case "service_id":
                    return "ID услуги";
                case "start_time":
                    return "Время начала";
                case "end_time":
                    return "Время окончания";
                case "price":
                    return "Цена";
                case "state":
                    return "Статус";
                case "cabinet_number":
                    return "Номер кабинета";
                default:
                    return field;
            }
        case "cabinets":
            switch (field) {
                case "number":
                    return "Номер";
                case "description":
                    return "Описание";
                case "departament_id":
                    return "ID отделения";
                default:
                    return field;
            }
        case "consumers":
            switch (field) {
                case "id":
                    return "ID";
                case "bio":
                    return "Биография";
                case "date_of_birth":
                    return "Дата рождения";
                case "first_name":
                    return "Имя";
                case "second_name":
                    return "Отчество";
                case "last_name":
                    return "Фамилия";
                case "phone_number":
                    return "Номер телефона";
                case "email":
                    return "Email";
                case "individual_sale":
                    return "Скидка";
                default:
                    return field;
            }
        case "departments":
            switch (field) {
                case "id":
                    return "ID";
                case "name":
                    return "Название";
                case "description":
                    return "Описание";
                default:
                    return field;
            }
        case "doctor_services":
            switch (field) {
                case "id":
                    return "ID";
                case "doctor_id":
                    return "ID врача";
                case "service_id":
                    return "ID услуги";
                default:
                    return field;
            }
        case "doctors":
            switch (field) {
                case "id":
                    return "ID";
                case "departament_id":
                    return "ID отделения";
                case "bio":
                    return "Биография";
                case "first_name":
                    return "Имя";
                case "second_name":
                    return "Отчество";
                case "last_name":
                    return "Фамилия";
                case "date_of_birth":
                    return "Дата рождения";
                default:
                    return field;
            }
        case "services":
            switch (field) {
                case "id":
                    return "ID";
                case "name":
                    return "Название";
                case "description":
                    return "Описание";
                case "price":
                    return "Цена";
                case "default_duration":
                    return "Продолжительность";
                default:
                    return field;
            }
        default:
            return field;
    }
}

export const entityToCreateOrUpdateForm = (entity, entityId = undefined) => {
    switch (entity) {
        case "appointment_records":
            return <AppointmentRecordForm entityId={entityId} />;
        case "cabinets":
            return <CabinetForm entityId={entityId} />;
        case "consumers":
            return <ConsumerForm entityId={entityId} />;
        case "departments":
            return <DepartamentForm entityId={entityId} />;
        case "doctor_services":
            return <DoctorServiceForm entityId={entityId} />;
        case "doctors":
            return <DoctorForm entityId={entityId} />;
        case "services":
            return <ServiceForm entityId={entityId} />;
        default:
            return null;
    }
}

export const getDoctorFullName = (doctor) => {
    return getConsumerFullName(doctor)
}

export const getConsumerFullName = (consumer) => {
    return (consumer.last_name ? consumer.last_name + " " : "") + (consumer.first_name ? consumer.first_name + " " : "") + (consumer.second_name ? consumer.second_name : "")
}

export const translateState = (state) => {
    switch (state) {
        case "cancelled":
            return "Отменено";
        case "in_progress":
            return "В процессе";
        case "done":
            return "Завершено";
        case "not_arrived":
            return "Не пришел";
        default:
            return state;
    }
}