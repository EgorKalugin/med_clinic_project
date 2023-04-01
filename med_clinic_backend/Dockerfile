FROM python:3.11.2-alpine

WORKDIR /med_clinic_backend_app

COPY /requirements.txt /med_clinic_backend_app

RUN pip install --no-cache-dir --upgrade -r /med_clinic_backend_app/requirements.txt

COPY . /med_clinic_backend_app

EXPOSE 8000
