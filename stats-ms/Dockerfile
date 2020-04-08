FROM python

COPY requirements.txt ./
RUN pip install -r requirements.txt

WORKDIR /src

COPY src/*.py ./

CMD [ "python", "script.py" ]
