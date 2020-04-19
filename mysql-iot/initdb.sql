ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE DATABASE iot;

CREATE TABLE iot.users (
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (username, password)
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
  'Rocky'
);

INSERT INTO iot.microcontrollers VALUES (
  'Rocky',
  '192.168.1.50',
  'temperature',
  'Grove - Temperature'
);
