ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE DATABASE iot;

CREATE TABLE iot.users (
  username VARCHAR(255) NOT NULL PRIMARY KEY,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE iot.microcontrollers (
  username VARCHAR(255) NOT NULL,
  ip VARCHAR(15) NOT NULL,
  measure VARCHAR(255) NOT NULL,
  sensor VARCHAR(255) NOT NULL,
  PRIMARY KEY (ip, measure),
  FOREIGN KEY (username) REFERENCES iot.users(username)
);

INSERT INTO iot.users VALUES (
  'Rocky',
  'e7f5d4066c9f8195959866aa6915027679384f97ed822a03b8b1b3ce4ecfae5b'
);

INSERT INTO iot.microcontrollers VALUES (
  'Rocky',
  '192.168.1.50',
  'temperature',
  'Grove - Temperature'
);
