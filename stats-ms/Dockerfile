FROM python:3.9.2-alpine

ENV PYTHONUNBUFFERED 1

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY src/ ./src/

CMD [ "python", "-m", "src" ]
