-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2024 at 04:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_coding_detector`
--

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_coding`
--

CREATE TABLE `vehicle_coding` (
  `id` int(11) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `plate_number` varchar(255) NOT NULL,
  `day` varchar(255) NOT NULL,
  `time` time NOT NULL,
  `city` varchar(255) NOT NULL,
  `coding_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehicle_coding`
--

INSERT INTO `vehicle_coding` (`id`, `vehicle_type`, `plate_number`, `day`, `time`, `city`, `coding_status`) VALUES
(1, 'Honda CRV ', 'DKM 1377 ', 'Tuesday', '09:02:00', 'taguig ', 'NOT CODING'),
(2, 'Honda CRV ', 'DKM 1377 ', 'Tuesday', '09:02:00', 'taguig ', 'NOT CODING'),
(3, 'Honda CRV ', 'DKM 1377 ', 'Thursday', '14:53:00', 'Makati City', 'CODING'),
(4, 'Honda CRV ', 'DKM 1377 ', 'Thursday', '14:53:00', 'Makati City', 'CODING'),
(5, 'Honda CRV ', 'DKM 1377 ', 'Thursday', '14:53:00', 'Makati City', 'CODING'),
(6, 'Honda CRV ', 'DKM 1377 ', 'Thursday', '14:53:00', 'Makati City', 'CODING'),
(7, 'Honda CRV ', 'DKM 1377 ', 'Thursday', '22:57:00', 'Makati City', 'NOT CODING'),
(8, 'Honda', 'DKM 1377 ', 'Thursday', '00:00:00', 'Makati City', 'NOT CODING'),
(9, 'Honda', 'DKM 1377 ', 'Thursday', '00:00:00', 'Makati City', 'NOT CODING'),
(10, 'daaa', 'DKM 1377 ', 'Wednesday', '15:02:00', 'Makati City', 'CODING'),
(11, 'Honda CRV ', 'DKM 1377', 'Thursday', '05:07:00', 'Makati City', 'NOT CODING'),
(12, 'Honda civic', 'DKM 1377', 'Monday', '17:08:00', 'Makati City', 'NOT CODING'),
(13, 'Honda', 'DKM 1377', 'Wednesday', '05:09:00', 'Makati City', 'NOT CODING'),
(14, 'Honda', 'DKM 1377', 'Monday', '17:11:00', 'Makati City', 'NOT CODING'),
(15, 'Honda', 'DKM 1377 ', 'Sunday', '04:10:00', 'Makati City', 'NOT CODING'),
(16, 'Honda', 'DKM 1377 ', 'Monday', '14:09:00', 'Makati City', 'CODING'),
(17, 'ad', 'DKM 1377 ', 'Monday', '06:14:00', 'Makati City', 'NOT CODING'),
(18, 'Hello', 'DKM 1377 ', 'Monday', '16:20:00', 'Makati City', 'CODING'),
(19, 'a', 'DKM 1377 ', 'Tuesday', '16:22:00', 'Makati City', 'CODING'),
(20, 'aaa', 'DKM 1377 ', 'Tuesday', '05:22:00', 'Makati City', 'NOT CODING'),
(21, 'dd', 'DKM 1377 ', 'Sunday', '05:26:00', 'Makati City', 'NOT CODING'),
(22, 'aaaa', 'DKM 1377 ', 'Monday', '06:28:00', 'Makati City', 'NOT CODING'),
(23, 'Els', 'DKM 1377 ', 'Monday', '04:26:00', 'Makati City', 'NOT CODING'),
(24, 'Honda CRV ', 'DKM 1377', 'Thursday', '13:27:00', 'Makati City', 'CODING'),
(25, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Makati City', 'NOT CODING'),
(26, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Makati City', 'NOT CODING'),
(27, 'Honda CRV', 'DKM 1377', 'Thursday', '09:30:00', 'Makati City', 'NOT CODING'),
(28, 'Honda CRV', 'DKM 1377', 'Thursday', '09:30:00', 'Makati City', 'NOT CODING'),
(29, 'Honda CRV', 'DKM 1377', 'Thursday', '09:30:00', 'Makati City', 'NOT CODING'),
(30, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(31, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(32, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(33, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(34, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(35, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(36, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(37, 'Honda CRV ', 'DKM 1377', 'Thursday', '09:30:00', 'Pasig City', 'NOT CODING'),
(38, 'Toyota Camry', 'UAP 2851', 'Monday', '13:34:00', 'Makati ', 'CODING'),
(39, 'Honda Bravo Motorcycle', 'DA 93600 ', 'Wednesday', '12:37:00', 'Pasay ', 'EXEMPTED'),
(40, 'Honda Bravo Motorcycle ', 'DA 93600 ', 'Wednesday', '12:37:00', 'Pasay ', 'EXEMPTED'),
(41, 'Honda Bravo Motorcycle ', 'DA 93600 ', 'Wednesday', '12:37:00', 'Pasay', 'EXEMPTED'),
(42, 'Honda CRV', 'DKM 1377 ', 'Thursday', '13:00:00', '', 'CODING'),
(43, 'Honda CRV', 'DKM 1377 ', 'Thursday', '13:00:00', '', 'CODING'),
(44, 'Honda CRV', 'DKM 1377 ', 'Thursday', '13:00:00', '', 'CODING'),
(45, 'Toyota Camry', 'UAP 2853', 'Monday', '08:30:00', '', 'NOT CODING'),
(46, 'Honda Bravo Motorcycle', 'DA 93600 ', 'Wednesday', '15:00:00', '', 'EXEMPTED'),
(47, 'Honda Bravo Motorcycle', 'DA 93600 ', 'Wednesday', '15:00:00', '', 'EXEMPTED'),
(48, 'aaaaaa', 'DKM 1377', 'Tuesday', '04:11:00', 'a', 'NOT CODING'),
(49, 'Toyota Camry ', 'UAP 2853 ', 'Monday', '08:30:00', 'Makati City', 'NOT CODING'),
(50, 'Honda CRV ', 'DKM 1377', 'Thursday', '10:05:00', '', 'CODING'),
(51, 'Toyota Camry ', 'UAP 2853 ', 'Monday', '20:30:00', '', 'NOT CODING'),
(52, 'Toyota Camry ', 'UAP 2853 ', 'Saturday', '20:30:00', '', 'NOT CODING'),
(53, 'Toyota Camry ', 'UAP 2853 ', 'Tuesday', '20:30:00', '', 'NOT CODING'),
(54, 'Toyota Camry ', 'UAP 2853 ', 'Saturday', '22:20:00', '', 'NOT CODING'),
(55, 'Honda Bravo Motorcycle', 'DA 93600 ', 'Wednesday', '15:00:00', '', 'EXEMPTED'),
(56, 'Toyota Camry ', 'DA 93600 ', 'Wednesday', '15:00:00', '', 'CODING'),
(57, 'Toyota Camry ', 'DA 93600 ', 'Saturday', '15:00:00', '', 'NOT CODING');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `vehicle_coding`
--
ALTER TABLE `vehicle_coding`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vehicle_coding`
--
ALTER TABLE `vehicle_coding`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
