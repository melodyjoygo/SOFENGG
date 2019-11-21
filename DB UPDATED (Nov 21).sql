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
-- Table structure for table `clerk_add_request`
--

DROP TABLE IF EXISTS `clerk_add_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clerk_add_request` (
  `requestID` int(11) NOT NULL,
  `materialID` varchar(45) NOT NULL,
  `quantity` varchar(45) NOT NULL,
  `unitPrice` varchar(45) NOT NULL,
  `userID` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clerk_add_request`
--

LOCK TABLES `clerk_add_request` WRITE;
/*!40000 ALTER TABLE `clerk_add_request` DISABLE KEYS */;
INSERT INTO `clerk_add_request` VALUES (1,'1','100','123',3,'Pending');
/*!40000 ALTER TABLE `clerk_add_request` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Riot Games'),(2,'Samsung'),(3,'Kfc'),(4,'Miki');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_tracker`
--

DROP TABLE IF EXISTS `delivery_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `delivery_tracker` (
  `deliveryID` int(11) NOT NULL,
  `deliveryReceiptNumber` varchar(45) NOT NULL,
  `materialID` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `invoiceNumber` varchar(45) NOT NULL,
  `poNumber` varchar(45) NOT NULL,
  `inInventory` int(11) NOT NULL,
  `unitPrice` decimal(10,0) NOT NULL,
  `requestID` int(11) NOT NULL,
  PRIMARY KEY (`deliveryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_tracker`
--

LOCK TABLES `delivery_tracker` WRITE;
/*!40000 ALTER TABLE `delivery_tracker` DISABLE KEYS */;
INSERT INTO `delivery_tracker` VALUES (1,'VN555',1,100,'IN123','P001',0,123,1);
/*!40000 ALTER TABLE `delivery_tracker` ENABLE KEYS */;
UNLOCK TABLES;

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
  `unitPrice` double DEFAULT NULL,
  PRIMARY KEY (`inventoryID`),
  KEY `materialID_idx` (`materialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_types`
--

LOCK TABLES `material_types` WRITE;
/*!40000 ALTER TABLE `material_types` DISABLE KEYS */;
INSERT INTO `material_types` VALUES (1,'Plastic'),(2,'Wood'),(3,'Acrylic'),(4,'Metal'),(5,'Bronze'),(6,'Gold'),(7,'Sterling');
/*!40000 ALTER TABLE `material_types` ENABLE KEYS */;
UNLOCK TABLES;

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
  `unitOfMeasure` int(11) NOT NULL,
  PRIMARY KEY (`materialID`),
  KEY `supplierID_idx` (`supplierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'2x4',2,1,1),(2,'2x4',1,1,1),(3,'Tent',3,1,1);
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

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

LOCK TABLES `project_materials` WRITE;
/*!40000 ALTER TABLE `project_materials` DISABLE KEYS */;
INSERT INTO `project_materials` VALUES (1,1,1,22222,0),(2,2,1,10,0),(3,1,1,12,0),(4,1,1,123,0),(5,1,3,10,0),(6,3,2,10,0),(7,1,1,123,0),(8,1,3,1,0);
/*!40000 ALTER TABLE `project_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,3,'P1911-00000','2019-11-17','Approved'),(2,1,'P1911-00001','2019-11-17','Pending'),(3,2,'P1911-00002','2019-11-18','Pending'),(4,1,'P1911-00003','2019-11-19','Pending');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockman_edit_requests`
--

DROP TABLE IF EXISTS `stockman_edit_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stockman_edit_requests` (
  `requestID` int(11) NOT NULL,
  `deliveryID` varchar(45) NOT NULL,
  `newDeliveryReceipt` varchar(45) NOT NULL,
  `newItemID` varchar(45) NOT NULL,
  `newQuantity` varchar(45) NOT NULL,
  `newSupplierID` varchar(45) NOT NULL,
  `currDeliveryReceipt` varchar(45) NOT NULL,
  `currItemID` varchar(45) NOT NULL,
  `currQuantity` varchar(45) NOT NULL,
  `currSupplierID` varchar(45) NOT NULL,
  `userID` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockman_edit_requests`
--

LOCK TABLES `stockman_edit_requests` WRITE;
/*!40000 ALTER TABLE `stockman_edit_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockman_edit_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockman_release_requests`
--

DROP TABLE IF EXISTS `stockman_release_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stockman_release_requests` (
  `requestID` int(11) NOT NULL,
  `projectID` varchar(45) NOT NULL,
  `itemID` varchar(45) NOT NULL,
  `qty` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `dateRequested` date NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`requestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockman_release_requests`
--

LOCK TABLES `stockman_release_requests` WRITE;
/*!40000 ALTER TABLE `stockman_release_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockman_release_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Ace Hardware','8878888'),(2,'Mcdonalds','88886236');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transactions` (
  `transactionID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  `supplieriD` int(11) NOT NULL,
  `price` decimal(19,4) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `quantity` int(11) NOT NULL,
  `poNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`transactionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,1,100.0000,'2019-11-19','Pending',12,'P002');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit_of_measures`
--

DROP TABLE IF EXISTS `unit_of_measures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `unit_of_measures` (
  `uomID` int(11) NOT NULL,
  `unitOfMeasure` varchar(45) NOT NULL,
  PRIMARY KEY (`uomID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_of_measures`
--

LOCK TABLES `unit_of_measures` WRITE;
/*!40000 ALTER TABLE `unit_of_measures` DISABLE KEYS */;
INSERT INTO `unit_of_measures` VALUES (1,'pc'),(2,'block'),(3,'pint');
/*!40000 ALTER TABLE `unit_of_measures` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES `user_types` WRITE;
/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (0,'Super Admin'),(1,'User Admin'),(2,'Admin'),(3,'Clerk'),(4,'Stockman');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(99) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userType` int(11) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Melody','Go','melody_go@dlsu.edu.ph','U2FsdGVkX19T8gjGy2tGPtfrn/rnuWE0HuxziIUopGo=',0),(2,'Rebecalyn','Lao','rebecalyn_lao@dlsu.edu.ph','U2FsdGVkX19Y7gb2XVpkBnheS2NLLZsfhXG4J7DIZUQ=',3),(3,'Darren','Tee','darren_tee@dlsu.edu.ph','U2FsdGVkX19YYa+sOn7aF33GDofFaCQQTuucgvK6S9I=',4);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `year_tracker`
--

DROP TABLE IF EXISTS `year_tracker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `year_tracker` (
  `yearID` int(11) NOT NULL,
  `currYear` int(11) NOT NULL,
  PRIMARY KEY (`yearID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `year_tracker`
--

LOCK TABLES `year_tracker` WRITE;
/*!40000 ALTER TABLE `year_tracker` DISABLE KEYS */;
INSERT INTO `year_tracker` VALUES (1,2019);
/*!40000 ALTER TABLE `year_tracker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-21 15:18:59
