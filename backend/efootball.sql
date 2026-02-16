-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql-ourouimed.alwaysdata.net
-- Generation Time: Feb 16, 2026 at 11:59 AM
-- Server version: 10.11.15-MariaDB
-- PHP Version: 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ourouimed_efootball25`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id_match` varchar(10) NOT NULL,
  `home_team` varchar(30) DEFAULT NULL,
  `hometeam_name` varchar(50) DEFAULT NULL,
  `home_score` int(11) DEFAULT NULL,
  `away_team` varchar(30) DEFAULT NULL,
  `awayteam_name` varchar(50) DEFAULT NULL,
  `away_score` int(11) DEFAULT NULL,
  `round` varchar(10) DEFAULT NULL,
  `played` tinyint(1) NOT NULL DEFAULT 0,
  `qualified` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `currentRound` varchar(3) DEFAULT NULL,
  `totalGws` int(11) DEFAULT NULL,
  `deadlineDate` datetime DEFAULT NULL,
  `registerIsOpen` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`currentRound`, `totalGws`, `deadlineDate`, `registerIsOpen`) VALUES
('PO', 8, '2025-11-11 23:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `userName` varchar(30) NOT NULL,
  `teamName` varchar(35) DEFAULT NULL,
  `phoneNum` varchar(25) DEFAULT NULL,
  `wins` int(11) DEFAULT 0,
  `losses` int(11) DEFAULT 0,
  `draws` int(11) DEFAULT 0,
  `GF` int(11) DEFAULT 0,
  `GA` int(11) DEFAULT 0,
  `KOGF` int(11) DEFAULT 0,
  `KOGA` int(11) DEFAULT 0,
  `sanction` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(10) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `name` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `role`, `name`) VALUES
('guest', 'guest', 'guest', 'guest'),
('ourouimed', 'medaminouroui', 'admin', 'Medamine');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `matches_ibfk_1` (`home_team`),
  ADD KEY `matches_ibfk_2` (`away_team`),
  ADD KEY `fk_qualified` (`qualified`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`userName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `fk_qualified` FOREIGN KEY (`qualified`) REFERENCES `teams` (`userName`),
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`home_team`) REFERENCES `teams` (`userName`),
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`away_team`) REFERENCES `teams` (`userName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
