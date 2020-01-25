CREATE DATABASE  IF NOT EXISTS `softengdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `softengdb`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: softengdb
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clerk_add_request`
--

DROP TABLE IF EXISTS clerk_add_request;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE clerk_add_request (
  requestID int(11) NOT NULL,
  materialID varchar(45) NOT NULL,
  quantity varchar(45) NOT NULL,
  unitPrice varchar(45) NOT NULL,
  userID int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  poNumber varchar(45) NOT NULL,
  date_arrived date DEFAULT NULL,
  PRIMARY KEY (requestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clerk_add_request`
--

LOCK TABLES clerk_add_request WRITE;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS clients;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE clients (
  clientID int(11) NOT NULL,
  clientName varchar(45) NOT NULL,
  PRIMARY KEY (clientID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES clients WRITE;
UNLOCK TABLES;

--
-- Table structure for table `delivery_tracker`
--

DROP TABLE IF EXISTS delivery_tracker;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE delivery_tracker (
  deliveryID int(11) NOT NULL,
  deliveryReceiptNumber varchar(45) NOT NULL,
  materialID int(11) NOT NULL,
  quantity int(11) NOT NULL,
  invoiceNumber varchar(45) NOT NULL,
  poNumber varchar(45) NOT NULL,
  inInventory int(11) NOT NULL,
  unitPrice decimal(10,0) NOT NULL,
  requestID varchar(45) NOT NULL,
  userID varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  date_arrived date DEFAULT NULL,
  checkNumber varchar(45) NOT NULL,
  PRIMARY KEY (deliveryID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_tracker`
--

LOCK TABLES delivery_tracker WRITE;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS inventory;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE inventory (
  inventoryID int(11) NOT NULL,
  materialID int(11) NOT NULL,
  quantity int(11) NOT NULL,
  dateModified date NOT NULL,
  unitPrice double NOT NULL,
  PRIMARY KEY (inventoryID),
  KEY materialID_idx (materialID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES inventory WRITE;
UNLOCK TABLES;

--
-- Table structure for table `material_types`
--

DROP TABLE IF EXISTS material_types;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE material_types (
  mtID int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (mtID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_types`
--

LOCK TABLES material_types WRITE;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS materials;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE materials (
  materialID int(11) NOT NULL,
  materialName varchar(45) NOT NULL,
  materialType int(11) NOT NULL,
  supplierID int(11) NOT NULL,
  unitOfMeasure int(11) NOT NULL,
  PRIMARY KEY (materialID),
  KEY supplierID_idx (supplierID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES materials WRITE;
UNLOCK TABLES;

--
-- Table structure for table `project_materials`
--

DROP TABLE IF EXISTS project_materials;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE project_materials (
  pmID int(11) NOT NULL,
  projectID int(11) NOT NULL,
  materialID int(11) NOT NULL,
  quantity int(11) NOT NULL,
  PRIMARY KEY (pmID),
  KEY projectID_idx (projectID),
  KEY materialID_idx (materialID),
  CONSTRAINT projectID FOREIGN KEY (projectID) REFERENCES projects (projectid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_materials`
--

LOCK TABLES project_materials WRITE;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS projects;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE projects (
  projectID int(11) NOT NULL,
  clientID int(11) DEFAULT NULL,
  projectNumber varchar(45) DEFAULT NULL,
  dateAdded date DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (projectID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES projects WRITE;
UNLOCK TABLES;

--
-- Table structure for table `stockman_edit_requests`
--

DROP TABLE IF EXISTS stockman_edit_requests;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE stockman_edit_requests (
  requestID int(11) NOT NULL,
  deliveryID varchar(45) NOT NULL,
  newDeliveryReceipt varchar(45) NOT NULL,
  newItemID varchar(45) NOT NULL,
  newQuantity varchar(45) NOT NULL,
  currDeliveryReceipt varchar(45) NOT NULL,
  currItemID varchar(45) NOT NULL,
  currQuantity varchar(45) NOT NULL,
  userID int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (requestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockman_edit_requests`
--

LOCK TABLES stockman_edit_requests WRITE;
UNLOCK TABLES;

--
-- Table structure for table `stockman_release_requests`
--

DROP TABLE IF EXISTS stockman_release_requests;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE stockman_release_requests (
  requestID int(11) NOT NULL,
  projectID varchar(45) NOT NULL,
  itemID varchar(45) NOT NULL,
  qty varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  dateRequested date NOT NULL,
  userID int(11) NOT NULL,
  released int(11) NOT NULL,
  dateReleased date DEFAULT NULL,
  PRIMARY KEY (requestID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockman_release_requests`
--

LOCK TABLES stockman_release_requests WRITE;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS suppliers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE suppliers (
  supplierID int(11) NOT NULL,
  supplierName varchar(45) NOT NULL,
  contactNumber tinytext NOT NULL,
  PRIMARY KEY (supplierID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES suppliers WRITE;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS transactions;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE transactions (
  transactionID int(11) NOT NULL,
  materialID int(11) NOT NULL,
  supplieriD int(11) NOT NULL,
  price decimal(19,4) NOT NULL,
  `date` date NOT NULL,
  `status` varchar(45) NOT NULL,
  quantity int(11) NOT NULL,
  poNumber varchar(45) NOT NULL,
  PRIMARY KEY (transactionID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES transactions WRITE;
UNLOCK TABLES;

--
-- Table structure for table `unit_of_measures`
--

DROP TABLE IF EXISTS unit_of_measures;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE unit_of_measures (
  uomID int(11) NOT NULL,
  unitOfMeasure varchar(45) NOT NULL,
  PRIMARY KEY (uomID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit_of_measures`
--

LOCK TABLES unit_of_measures WRITE;
UNLOCK TABLES;

--
-- Table structure for table `user_types`
--

DROP TABLE IF EXISTS user_types;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE user_types (
  utID int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (utID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_types`
--

LOCK TABLES user_types WRITE;
INSERT INTO user_types VALUES (0,'Super Admin'),(1,'User Admin'),(2,'Admin'),(3,'Purchasing'),(4,'Stockman');
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS users;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users (
  userID int(11) NOT NULL AUTO_INCREMENT,
  firstName varchar(45) NOT NULL,
  lastName varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  `password` varchar(99) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  userType int(11) NOT NULL,
  PRIMARY KEY (userID),
  UNIQUE KEY userID_UNIQUE (userID)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES users WRITE;
INSERT INTO users VALUES (1,'Melody','Goooo','melody_go@dlsu.edu.ph','U2FsdGVkX19CDy6/r0R+PXIyLDuWyxBpmbFcNtSiPdA=',0);
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
