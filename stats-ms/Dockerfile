FROM python:3.8.2-alpine

COPY requirements.txt ./
RUN pip install -r requirements.txt

WORKDIR /src

COPY src/*.py ./

CMD [ "python", "script.py" ]
