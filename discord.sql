-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Maj 2021, 21:00
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `discord`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `characters`
--

CREATE TABLE `characters` (
  `id` int(11) NOT NULL,
  `id_user` varchar(30) NOT NULL,
  `class` enum('archer','warrior','mag') NOT NULL,
  `helmet` int(11) DEFAULT NULL,
  `breastplate` int(11) DEFAULT NULL,
  `trousers` int(11) DEFAULT NULL,
  `shoes` int(11) DEFAULT NULL,
  `weapon` int(11) DEFAULT NULL,
  `hp` float NOT NULL,
  `str` float NOT NULL,
  `dex` float NOT NULL,
  `inte` float NOT NULL,
  `gold` float NOT NULL,
  `place` enum('City','Forest','Shop','Arena','Dungeon') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `characters`
--

INSERT INTO `characters` (`id`, `id_user`, `class`, `helmet`, `breastplate`, `trousers`, `shoes`, `weapon`, `hp`, `str`, `dex`, `inte`, `gold`, `place`) VALUES
(38, '568051463868383252', 'warrior', NULL, NULL, NULL, NULL, 7, 10, 10, 10, 10, 0, 'City'),
(40, '641669220488183828', 'archer', NULL, NULL, NULL, NULL, 6, 10, 10, 10, 10, 0, 'City');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `items`
--

CREATE TABLE `items` (
  `id_item` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type_item` enum('helmet','breastplate','trousers','shoes','weapon','potion') NOT NULL,
  `for_class` enum('archer','mag','warrior','all') NOT NULL,
  `hp` float NOT NULL DEFAULT 0,
  `str` float NOT NULL DEFAULT 0,
  `dex` float NOT NULL DEFAULT 0,
  `inte` int(11) NOT NULL DEFAULT 0,
  `armor` float NOT NULL,
  `gold` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `items`
--

INSERT INTO `items` (`id_item`, `name`, `type_item`, `for_class`, `hp`, `str`, `dex`, `inte`, `armor`, `gold`) VALUES
(1, 'Cap', 'helmet', 'all', 4, 0, 0, 1, 10, 5),
(3, 'Socks', 'shoes', 'all', 2, 0, 2, 0, 8, 2),
(5, 'Short trousers', 'trousers', 'all', 4, 0, 0, 0, 15, 5),
(6, 'Water gun', 'weapon', 'archer', 0, 0, 12, 0, 23, 23),
(7, 'Branch', 'weapon', 'warrior', 0, 9, 0, 0, 0, 25),
(8, 'Stick', 'weapon', 'mag', 0, 0, 8, 0, 0, 19),
(9, 'T-shirt', 'breastplate', 'all', 15, 2, 0, 0, 30, 48);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `id_user` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `test`
--

INSERT INTO `test` (`id`, `text`, `id_user`) VALUES
(3, 'raphtalia filo ', '433287118081490955'),
(27, 'Hello', '820359418646102057');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `helmet` (`helmet`),
  ADD KEY `trousers` (`trousers`),
  ADD KEY `shoes` (`shoes`),
  ADD KEY `weapon` (`weapon`),
  ADD KEY `breastplate` (`breastplate`);

--
-- Indeksy dla tabeli `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id_item`);

--
-- Indeksy dla tabeli `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT dla tabeli `items`
--
ALTER TABLE `items`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `characters`
--
ALTER TABLE `characters`
  ADD CONSTRAINT `characters_ibfk_1` FOREIGN KEY (`helmet`) REFERENCES `items` (`id_item`),
  ADD CONSTRAINT `characters_ibfk_2` FOREIGN KEY (`trousers`) REFERENCES `items` (`id_item`),
  ADD CONSTRAINT `characters_ibfk_3` FOREIGN KEY (`shoes`) REFERENCES `items` (`id_item`),
  ADD CONSTRAINT `characters_ibfk_4` FOREIGN KEY (`weapon`) REFERENCES `items` (`id_item`),
  ADD CONSTRAINT `characters_ibfk_5` FOREIGN KEY (`breastplate`) REFERENCES `items` (`id_item`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
