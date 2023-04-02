FROM python:3.11.2-alpine

WORKDIR /med_clinic_backend

COPY /requirements.txt /med_clinic_backend

RUN pip install --no-cache-dir --upgrade -r /med_clinic_backend/requirements.txt

COPY . /med_clinic_backend

EXPOSE 8000

CMD [ "python", "-u", "/med_clinic_backend/main.py" ]
