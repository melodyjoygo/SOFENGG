CREATE DATABASE  IF NOT EXISTS `softengdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `softengdb`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: softengdb
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clients` (
  `clientID` int(11) NOT NULL,
  `clientName` varchar(45) NOT NULL,
  PRIMARY KEY (`clientID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` VALUES (1,'Riot Games');
INSERT INTO `clients` VALUES (2,'Samsung');
INSERT INTO `clients` VALUES (3,'Adidas');

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inventory` (
  `inventoryID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `dateModified` date NOT NULL,
  PRIMARY KEY (`inventoryID`),
  KEY `materialID_idx` (`materialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` VALUES (1,1,0,'2019-10-22');

--
-- Table structure for table `material_types`
--

DROP TABLE IF EXISTS `material_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `material_types` (
  `mtID` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`mtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_types`
--

INSERT INTO `material_types` VALUES (1,'Plastic');
INSERT INTO `material_types` VALUES (2,'Wood');
INSERT INTO `material_types` VALUES (3,'Acrylic');

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `materials` (
  `materialID` int(11) NOT NULL,
  `materialName` varchar(45) NOT NULL,
  `materialType` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`materialID`),
  KEY `supplierID_idx` (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` VALUES (1,'2x4',2,1,100);

--
-- Table structure for table `project_materials`
--

DROP TABLE IF EXISTS `project_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project_materials` (
  `pmID` int(11) NOT NULL,
  `projectID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`pmID`),
  KEY `projectID_idx` (`projectID`),
  KEY `materialID_idx` (`materialID`),
  CONSTRAINT `projectID` FOREIGN KEY (`projectID`) REFERENCES `projects` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_materials`
--


--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `projects` (
  `projectID` int(11) NOT NULL,
  `projectName` varchar(45) DEFAULT NULL,
  `clientID` int(11) DEFAULT NULL,
  PRIMARY KEY (`projectID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` VALUES (1,'lol2',1);
INSERT INTO `projects` VALUES (2,'lol2',2);
INSERT INTO `projects` VALUES (3,'Superstar 10',3);

--
-- Table structure for table `request_types`
--

DROP TABLE IF EXISTS `request_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `request_types` (
  `rtID` int(11) NOT NULL,
  `requestType` varchar(45) NOT NULL,
  PRIMARY KEY (`rtID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_types`
--


--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
  `dateRequested` datetime NOT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--


--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `suppliers` (
  `supplierID` int(11) NOT NULL,
  `supplierName` varchar(45) NOT NULL,
  PRIMARY KEY (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` VALUES (1,'Samsung');
INSERT INTO `suppliers` VALUES (2,'Addidas');

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transactions` (
  `transactionID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `supplierID` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--


--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS `user_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_types` (
  `utID` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`utID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` VALUES (0,'Super Admin');
INSERT INTO `user_types` VALUES (1,'User Admin');
INSERT INTO `user_types` VALUES (2,'Admin');
INSERT INTO `user_types` VALUES (3,'Clerk');
INSERT INTO `user_types` VALUES (4,'Stockman');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `fullName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `userType` int(11) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES (1,'zard_lao','Zard Lao','','U2FsdGVkX1+cDzmiVZ6AzP/qSsqp1dtkRZ91uwu+5mE=',0);
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-23  2:21:09
