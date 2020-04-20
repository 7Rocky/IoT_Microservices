FROM golang:1.14.2-alpine

WORKDIR /go/src

COPY src/go.mod ./
COPY src/go.sum ./
RUN go mod download

COPY src ./
RUN go build -o main .

CMD [ "./main" ]
