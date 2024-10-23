-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2024 at 03:41 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `siswa_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `absensiswas`
--

CREATE TABLE `absensiswas` (
  `id` int(11) NOT NULL,
  `semester` varchar(10) NOT NULL,
  `tglAbsen` varchar(10) NOT NULL,
  `hariAbsen` varchar(10) NOT NULL,
  `keterangan` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `siswaId` int(11) DEFAULT NULL,
  `kelasId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absensiswas`
--

INSERT INTO `absensiswas` (`id`, `semester`, `tglAbsen`, `hariAbsen`, `keterangan`, `createdAt`, `updatedAt`, `siswaId`, `kelasId`) VALUES
(1, 'satu / 1', '23-10-2024', 'rabu', 'hadir', '2024-10-23 01:30:03', '2024-10-23 01:30:03', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `ttl` varchar(50) NOT NULL,
  `jk` varchar(20) NOT NULL,
  `agama` varchar(20) NOT NULL,
  `noTelp` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `foto` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `nama`, `ttl`, `jk`, `agama`, `noTelp`, `alamat`, `foto`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Admin Profile 1', 'Pati, 18 September 1992', 'laki laki', 'Islam', '08xxxxxxxxxx', 'Pati kota cuy', 'http://localhost:3000/uploads/1727411642380.jpg', '2024-10-23 01:26:24', '2024-10-23 01:26:24', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gurus`
--

CREATE TABLE `gurus` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `nig` varchar(255) NOT NULL,
  `ttl` varchar(50) NOT NULL,
  `jk` varchar(20) NOT NULL,
  `agama` varchar(20) NOT NULL,
  `noTelp` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `foto` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gurus`
--

INSERT INTO `gurus` (`id`, `nama`, `nig`, `ttl`, `jk`, `agama`, `noTelp`, `alamat`, `foto`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Guru Profile 1', '7234235235', 'Pati, 18 September 1992', 'laki laki', 'Islam', '08xxxxxxxxxx', 'Pati kota cuy', 'http://localhost:3000/uploads/1727410644029.jpg', '2024-10-23 01:28:05', '2024-10-23 01:28:05', 3);

-- --------------------------------------------------------

--
-- Table structure for table `jadwals`
--

CREATE TABLE `jadwals` (
  `id` int(11) NOT NULL,
  `hari` varchar(10) NOT NULL,
  `jam` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `guruId` int(11) DEFAULT NULL,
  `kelasId` int(11) DEFAULT NULL,
  `matpelId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jadwals`
--

INSERT INTO `jadwals` (`id`, `hari`, `jam`, `createdAt`, `updatedAt`, `guruId`, `kelasId`, `matpelId`) VALUES
(1, 'senin', '07.00 - 08.00', '2024-10-23 01:28:32', '2024-10-23 01:28:32', 1, 1, 3),
(2, 'senin', '08.00 - 09.00', '2024-10-23 01:28:41', '2024-10-23 01:28:41', 1, 1, 2),
(3, 'senin', '09.00 - 10.00', '2024-10-23 01:28:51', '2024-10-23 01:28:51', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 'X', '2024-10-23 01:27:08', '2024-10-23 01:27:08'),
(2, 'XI', '2024-10-23 01:27:11', '2024-10-23 01:27:11'),
(3, 'XII', '2024-10-23 01:27:15', '2024-10-23 01:27:15');

-- --------------------------------------------------------

--
-- Table structure for table `matpels`
--

CREATE TABLE `matpels` (
  `id` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matpels`
--

INSERT INTO `matpels` (`id`, `nama`, `createdAt`, `updatedAt`) VALUES
(1, 'MTK', '2024-10-23 01:26:42', '2024-10-23 01:26:42'),
(2, 'IPS', '2024-10-23 01:26:46', '2024-10-23 01:26:46'),
(3, 'PKN', '2024-10-23 01:26:52', '2024-10-23 01:26:52');

-- --------------------------------------------------------

--
-- Table structure for table `nilaiuas`
--

CREATE TABLE `nilaiuas` (
  `id` int(11) NOT NULL,
  `nilai` double NOT NULL,
  `semester` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `siswaId` int(11) DEFAULT NULL,
  `kelasId` int(11) DEFAULT NULL,
  `matpelId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nilaiuas`
--

INSERT INTO `nilaiuas` (`id`, `nilai`, `semester`, `createdAt`, `updatedAt`, `siswaId`, `kelasId`, `matpelId`) VALUES
(1, 70.32, 'satu / 1', '2024-10-23 01:34:12', '2024-10-23 01:34:12', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nilaiuts`
--

CREATE TABLE `nilaiuts` (
  `id` int(11) NOT NULL,
  `nilai` double NOT NULL,
  `semester` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `siswaId` int(11) DEFAULT NULL,
  `kelasId` int(11) DEFAULT NULL,
  `matpelId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nilaiuts`
--

INSERT INTO `nilaiuts` (`id`, `nilai`, `semester`, `createdAt`, `updatedAt`, `siswaId`, `kelasId`, `matpelId`) VALUES
(1, 70.32, 'satu / 1', '2024-10-23 01:34:03', '2024-10-23 01:34:03', 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `siswas`
--

CREATE TABLE `siswas` (
  `id` int(11) NOT NULL,
  `nis` varchar(255) NOT NULL,
  `semester` varchar(10) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `ttl` varchar(30) NOT NULL,
  `jk` varchar(50) NOT NULL,
  `agama` varchar(20) NOT NULL,
  `noTelp` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `foto` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `kelasId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswas`
--

INSERT INTO `siswas` (`id`, `nis`, `semester`, `nama`, `ttl`, `jk`, `agama`, `noTelp`, `alamat`, `foto`, `createdAt`, `updatedAt`, `userId`, `kelasId`) VALUES
(1, '23592335253', 'satu / 1', 'Siswa Profile 1', 'Pati, 18 September 1992', 'laki laki', 'Islam', '08xxxxxxxxxx', 'Pati kota cuy', 'http://localhost:3000/uploads/1727411642380.jpg', '2024-10-23 01:29:48', '2024-10-23 01:29:48', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `hakAkses` enum('siswa','wali murid','guru','admin') NOT NULL DEFAULT 'siswa',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `hakAkses`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2a$10$J6SFyTcm/Q51kRNCRLF6HO/FG9cwPOQHacJeYTuAsmMOUCR7xQzoG', 'admin', '2024-10-23 01:25:30', '2024-10-23 01:25:30'),
(2, 'siswa', '$2a$10$VGZyQSWKJPE.IiupJIjiV.K4rdnDK2UP4H0s/ZzndYOs2XH7jiyRG', 'siswa', '2024-10-23 01:25:44', '2024-10-23 01:25:44'),
(3, 'guru', '$2a$10$ElwgkHouGNqPa1Pl30frw.MZMJOB/4fVzLfmNAzJznPWjJdGMAIma', 'guru', '2024-10-23 01:25:50', '2024-10-23 01:25:50'),
(4, 'walimurid', '$2a$10$fZCHYf9Jb3jn2AtptmXAu.1rKnrxzUnCJZFUQnBcQ4izXeMVgZ7pS', 'wali murid', '2024-10-23 01:26:01', '2024-10-23 01:26:01');

-- --------------------------------------------------------

--
-- Table structure for table `walimurids`
--

CREATE TABLE `walimurids` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `ttl` varchar(30) NOT NULL,
  `noTelp` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `email` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `siswaId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `walimurids`
--

INSERT INTO `walimurids` (`id`, `nama`, `ttl`, `noTelp`, `alamat`, `email`, `createdAt`, `updatedAt`, `siswaId`, `userId`) VALUES
(1, 'Wali Murid Profile 1', 'Pati, 18 agustus 1999', '08xxxxxxxxxx', 'Pati kota cuy', 'pakde@gmail.com', '2024-10-23 01:36:24', '2024-10-23 01:36:24', 1, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absensiswas`
--
ALTER TABLE `absensiswas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siswaId` (`siswaId`),
  ADD KEY `kelasId` (`kelasId`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `gurus`
--
ALTER TABLE `gurus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `jadwals`
--
ALTER TABLE `jadwals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guruId` (`guruId`),
  ADD KEY `kelasId` (`kelasId`),
  ADD KEY `matpelId` (`matpelId`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matpels`
--
ALTER TABLE `matpels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nilaiuas`
--
ALTER TABLE `nilaiuas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siswaId` (`siswaId`),
  ADD KEY `kelasId` (`kelasId`),
  ADD KEY `matpelId` (`matpelId`);

--
-- Indexes for table `nilaiuts`
--
ALTER TABLE `nilaiuts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siswaId` (`siswaId`),
  ADD KEY `kelasId` (`kelasId`),
  ADD KEY `matpelId` (`matpelId`);

--
-- Indexes for table `siswas`
--
ALTER TABLE `siswas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `kelasId` (`kelasId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `walimurids`
--
ALTER TABLE `walimurids`
  ADD PRIMARY KEY (`id`),
  ADD KEY `siswaId` (`siswaId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absensiswas`
--
ALTER TABLE `absensiswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `gurus`
--
ALTER TABLE `gurus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jadwals`
--
ALTER TABLE `jadwals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `matpels`
--
ALTER TABLE `matpels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `nilaiuas`
--
ALTER TABLE `nilaiuas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `nilaiuts`
--
ALTER TABLE `nilaiuts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `siswas`
--
ALTER TABLE `siswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `walimurids`
--
ALTER TABLE `walimurids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absensiswas`
--
ALTER TABLE `absensiswas`
  ADD CONSTRAINT `absensiswas_ibfk_1` FOREIGN KEY (`siswaId`) REFERENCES `siswas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `absensiswas_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `gurus`
--
ALTER TABLE `gurus`
  ADD CONSTRAINT `gurus_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `jadwals`
--
ALTER TABLE `jadwals`
  ADD CONSTRAINT `jadwals_ibfk_1` FOREIGN KEY (`guruId`) REFERENCES `gurus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwals_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwals_ibfk_3` FOREIGN KEY (`matpelId`) REFERENCES `matpels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `nilaiuas`
--
ALTER TABLE `nilaiuas`
  ADD CONSTRAINT `nilaiuas_ibfk_1` FOREIGN KEY (`siswaId`) REFERENCES `siswas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nilaiuas_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nilaiuas_ibfk_3` FOREIGN KEY (`matpelId`) REFERENCES `matpels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `nilaiuts`
--
ALTER TABLE `nilaiuts`
  ADD CONSTRAINT `nilaiuts_ibfk_1` FOREIGN KEY (`siswaId`) REFERENCES `siswas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nilaiuts_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `nilaiuts_ibfk_3` FOREIGN KEY (`matpelId`) REFERENCES `matpels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `siswas`
--
ALTER TABLE `siswas`
  ADD CONSTRAINT `siswas_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `siswas_ibfk_2` FOREIGN KEY (`kelasId`) REFERENCES `kelas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `walimurids`
--
ALTER TABLE `walimurids`
  ADD CONSTRAINT `walimurids_ibfk_1` FOREIGN KEY (`siswaId`) REFERENCES `siswas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `walimurids_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
