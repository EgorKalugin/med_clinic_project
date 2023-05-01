export const entities = [
    "appointment_records",
    "cabinets",
    "consumers",
    "departaments",
    "doctor_services",
    "doctors",
    "services",
];

// URLS for requests to backend
const BACKEND_URL = 'http://localhost:8000';
export const ENTITY_TO_URL_MAP_GET = {
    "appointment_records": BACKEND_URL + "/appointment_record",
    "cabinets": BACKEND_URL + "/cabinet",
    "consumers": BACKEND_URL + "/consumer",
    "departaments": BACKEND_URL + "/departament",
    "doctor_services": BACKEND_URL + "/doctor_service",
    "doctors": BACKEND_URL + "/doctor",
    "services": BACKEND_URL + "/service",
};

export const ENTITY_TO_URL_MAP_POST = {
    "appointment_records": BACKEND_URL + "/appointment_record",
    "cabinets": BACKEND_URL + "/cabinet",
    "consumers": BACKEND_URL + "/consumer",
    "departaments": BACKEND_URL + "/departament",
    "doctor_services": BACKEND_URL + "/doctor_service",
    "doctors": BACKEND_URL + "/doctor",
    "services": BACKEND_URL + "/service",
};
// ======================================================

export const translateEntityPlural = (entity) => {
    switch (entity) {
        case "appointment_records":
            return "Записи на прием";
        case "cabinets":
            return "Кабинеты";
        case "consumers":
            return "Пациенты";
        case "departaments":
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

export const translateEntitySingular = (entity) => {
    switch (entity) {
        case "appointment_records":
            return "Запись на прием";
        case "cabinets":
            return "Кабинет";
        case "consumers":
            return "Пациент";
        case "departaments":
            return "Отделение";
        case "doctor_services":
            return "Услуга врача";
        case "doctors":
            return "Врач";
        case "services":
            return "Услуга";
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
//     "departaments":
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
        case "departaments":
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

