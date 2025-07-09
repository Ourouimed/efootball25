-- Create database
CREATE DATABASE IF NOT EXISTS `efootball25`;
USE `efootball25`;

-- Table : matches
CREATE TABLE `matches` (
  `id_match` VARCHAR(10) NOT NULL,
  `home_team` VARCHAR(30),
  `hometeam_name` VARCHAR(50),
  `home_score` INT,
  `away_team` VARCHAR(30),
  `awayteam_name` VARCHAR(50),
  `away_score` INT,
  `date_match` DATE,
  PRIMARY KEY (`id_match`)
);

-- Table : session
CREATE TABLE `session` (
  `id_session` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50),
  `login_time` DATETIME,
  PRIMARY KEY (`id_session`)
);

-- Table : settings
CREATE TABLE `settings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(50),
  `setting_value` VARCHAR(100),
  PRIMARY KEY (`id`)
);

-- Table : teams
CREATE TABLE `teams` (
  `id_team` VARCHAR(10) NOT NULL,
  `team_name` VARCHAR(50),
  `logo_url` VARCHAR(255),
  PRIMARY KEY (`id_team`)
);
