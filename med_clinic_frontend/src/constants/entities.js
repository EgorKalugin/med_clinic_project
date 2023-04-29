export const entities = [
    "appointment_records",
    "cabinets",
    "consumers",
    "departaments",
    "doctor_services",
    "doctors",
    "services",
];

const BACKEND_URL = 'http://localhost:8000';
export const ENTITY_TO_URL_MAP = {
    "appointment_records": BACKEND_URL + "/appointment_record",
    "cabinets": BACKEND_URL + "/cabinet",
    "consumers": BACKEND_URL + "/consumer",
    "departaments": BACKEND_URL + "/departament",
    "doctor_services": BACKEND_URL + "/doctor_service",
    "doctors": BACKEND_URL + "/doctor",
    "services": BACKEND_URL + "/service",
};

