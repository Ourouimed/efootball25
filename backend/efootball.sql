CREATE TABLE settings (
  currentRound varchar(3) DEFAULT NULL,
  totalGws int DEFAULT NULL,
  deadlineDate datetime DEFAULT NULL,
  registerIsOpen BOOLEAN DEFAULT FALSE
); 


CREATE TABLE users (
  id varchar(10) NOT NULL PRIMARY KEY,
  password varchar(30) DEFAULT NULL,
  role varchar(10) DEFAULT NULL,
  name varchar(15) DEFAULT NULL
);


CREATE TABLE teams (
  userName varchar(30) PRIMARY KEY,
  teamName varchar(35) DEFAULT NULL,
  phoneNum varchar(25) DEFAULT NULL
) ;


CREATE table standing (
    id_team varchar(30) PRIMARY KEY ,
    wins int DEFAULT 0,
    losses int DEFAULT 0,
    draws int DEFAULT 0,
    GF int DEFAULT 0,
    GA int DEFAULT 0,
    KOGF int DEFAULT 0,
    KOGA int DEFAULT 0,
    sanction int DEFAULT 0 ,
    FOREIGN KEY (id_team) REFERENCES teams (userName)
);

CREATE TABLE matches (
  id_match varchar(10) NOT NULL PRIMARY KEY ,
  home_team varchar(30) DEFAULT NULL,
  home_score int DEFAULT NULL,
  away_team varchar(30) DEFAULT NULL,
  away_score int DEFAULT NULL,
  round varchar(10) DEFAULT NULL,
  played BOOLEAN NOT NULL DEFAULT FALSE,
  qualified varchar(30) DEFAULT NULL ,
  FOREIGN KEY (home_team) REFERENCES teams (userName) ,
  FOREIGN KEY (away_team) REFERENCES teams (userName),
  FOREIGN KEY (qualified) REFERENCES teams (userName)
);




