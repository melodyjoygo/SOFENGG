CREATE DATABASE  IF NOT EXISTS `softengdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `softengdb`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: softengdb
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `clientID` int(11) NOT NULL,
  `clientName` varchar(45) NOT NULL,
  PRIMARY KEY (`clientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Riot Games');
INSERT INTO `clients` VALUES (2,'Samsung');
INSERT INTO `clients` VALUES (3,'Adidas');
INSERT INTO `clients` VALUES (4,'Apple');
INSERT INTO `clients` VALUES (5,'Abcd');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

--
-- Table structure for table `delivery_tracker`
--

DROP TABLE IF EXISTS `delivery_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_tracker` (
  `deliveryID` int(11) NOT NULL,
  `invoiceNumber` varchar(45) NOT NULL,
  `deliveryReceiptNumber` varchar(45) NOT NULL,
  `materialID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`deliveryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_tracker`
--

/*!40000 ALTER TABLE `delivery_tracker` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_tracker` ENABLE KEYS */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventoryID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `dateModified` date NOT NULL,
  PRIMARY KEY (`inventoryID`),
  KEY `materialID_idx` (`materialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,0,'2019-10-22');
INSERT INTO `inventory` VALUES (2,2,0,'2019-11-04');
INSERT INTO `inventory` VALUES (3,3,0,'2019-11-09');
INSERT INTO `inventory` VALUES (4,3,0,'2019-11-09');
INSERT INTO `inventory` VALUES (5,3,0,'2019-11-09');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

--
-- Table structure for table `material_types`
--

DROP TABLE IF EXISTS `material_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_types` (
  `mtID` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`mtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_types`
--

/*!40000 ALTER TABLE `material_types` DISABLE KEYS */;
INSERT INTO `material_types` VALUES (1,'Plastic');
INSERT INTO `material_types` VALUES (2,'Wood');
INSERT INTO `material_types` VALUES (3,'Acrylic');
INSERT INTO `material_types` VALUES (4,'Metal');
INSERT INTO `material_types` VALUES (5,'Bronze');
INSERT INTO `material_types` VALUES (6,'Gold');
/*!40000 ALTER TABLE `material_types` ENABLE KEYS */;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `materialID` int(11) NOT NULL,
  `materialName` varchar(45) NOT NULL,
  `materialType` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `unitOfMeasure` int(11) NOT NULL,
  PRIMARY KEY (`materialID`),
  KEY `supplierID_idx` (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'2x4',2,1,1);
INSERT INTO `materials` VALUES (2,'2x4',1,1,1);
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;

--
-- Table structure for table `project_materials`
--

DROP TABLE IF EXISTS `project_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_materials` (
  `pmID` int(11) NOT NULL,
  `projectID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`pmID`),
  KEY `projectID_idx` (`projectID`),
  KEY `materialID_idx` (`materialID`),
  CONSTRAINT `projectID` FOREIGN KEY (`projectID`) REFERENCES `projects` (`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_materials`
--

/*!40000 ALTER TABLE `project_materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_materials` ENABLE KEYS */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `projectID` int(11) NOT NULL,
  `clientID` int(11) DEFAULT NULL,
  `projectNumber` varchar(45) DEFAULT NULL,
  `dateAdded` date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,1,'P19010-00000','2019-10-24',NULL);
INSERT INTO `projects` VALUES (2,2,'P19010-00001','2019-10-24',NULL);
INSERT INTO `projects` VALUES (3,3,'P19010-00002','2019-10-24',NULL);
INSERT INTO `projects` VALUES (4,4,'P1911-00003','2019-11-04',NULL);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;

--
-- Table structure for table `request_types`
--

DROP TABLE IF EXISTS `request_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_types` (
  `rtID` int(11) NOT NULL,
  `requestType` varchar(45) NOT NULL,
  PRIMARY KEY (`rtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_types`
--

/*!40000 ALTER TABLE `request_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_types` ENABLE KEYS */;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `requestID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `materialName` varchar(45) NOT NULL,
  `materialType` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `edited` tinyint(4) DEFAULT NULL,
  `approved` tinyint(4) NOT NULL,
  `requestTypel` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `dateRequested` datetime NOT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplierID` int(11) NOT NULL,
  `supplierName` varchar(45) NOT NULL,
  `contactNumber` tinytext NOT NULL,
  PRIMARY KEY (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Samsung','');
INSERT INTO `suppliers` VALUES (2,'Addidas','');
INSERT INTO `suppliers` VALUES (3,'Sadasdas','');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,1,100,'2019-10-23','Pending',2);
INSERT INTO `transactions` VALUES (2,1,1,1222,'2019-11-04','Pending',12);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

--
-- Table structure for table `unit_of_measures`
--

DROP TABLE IF EXISTS `unit_of_measures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit_of_measures` (
  `uomID` int(11) NOT NULL,
  `unitOfMeasure` varchar(45) NOT NULL,
  PRIMARY KEY (`uomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_of_measures`
--

/*!40000 ALTER TABLE `unit_of_measures` DISABLE KEYS */;
INSERT INTO `unit_of_measures` VALUES (1,'pc');
INSERT INTO `unit_of_measures` VALUES (2,'block');
INSERT INTO `unit_of_measures` VALUES (3,'pint');
/*!40000 ALTER TABLE `unit_of_measures` ENABLE KEYS */;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_types` (
  `utID` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`utID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (0,'Super Admin');
INSERT INTO `user_types` VALUES (1,'User Admin');
INSERT INTO `user_types` VALUES (2,'Admin');
INSERT INTO `user_types` VALUES (3,'Clerk');
INSERT INTO `user_types` VALUES (4,'Stockman');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `userType` int(11) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Darren Tee','dardartee7@gmail.com','U2FsdGVkX19Bb2wGzgv+J2R3r0BOMnR94+fH/S0nxDY=',1);
INSERT INTO `users` VALUES (2,'melody go','melody@gmail.com','U2FsdGVkX1/EwCB8Ryml4lUxcOmWvwFH6lGa2bpOavA=',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

--
-- Table structure for table `year_tracker`
--

DROP TABLE IF EXISTS `year_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `year_tracker` (
  `yearID` int(11) NOT NULL,
  `currYear` int(11) NOT NULL,
  PRIMARY KEY (`yearID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `year_tracker`
--

/*!40000 ALTER TABLE `year_tracker` DISABLE KEYS */;
INSERT INTO `year_tracker` VALUES (1,2019);
/*!40000 ALTER TABLE `year_tracker` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-13 17:25:32
