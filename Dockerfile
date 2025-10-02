FROM python:3.13.3

RUN mkdir /monitoring

WORKDIR /monitoring

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["guvicorn" "app.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind=0.0.0:8000"]

