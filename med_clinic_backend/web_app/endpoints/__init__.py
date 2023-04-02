from .appointment_records import router as appointment_records_router
from .cabinets import router as cabinets_router
from .consumers import router as consumers_router
from .departaments import router as departaments_router
from .doctor_services import router as doctor_services_router
from .doctors import router as doctors_router
from .services import router as services_router

med_clinic_routers = [
    consumers_router,
    appointment_records_router,
    doctors_router,
    services_router,
    departaments_router,
    doctor_services_router,
    cabinets_router,
]
