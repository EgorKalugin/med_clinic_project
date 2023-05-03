import { ENTITY_TO_URL_MAP_GET } from "./entities_mappings"

export const fetchDepartments = async () => {
    const CONST_URL = ENTITY_TO_URL_MAP_GET["departments"];
    const response = await fetch(CONST_URL, { "amount": 100 });
    const data = await response.json();
    const departments = data.map((department) => {
        return {
            id: department.id,
            name: department.name,
            description: department.description,
        };
    });
    return departments;
}