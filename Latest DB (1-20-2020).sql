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
INSERT INTO clerk_add_request VALUES (1,'1','100','100',2,'Approved','PO001','2019-12-17'),(2,'1','100','100',2,'Approved','PO002','2019-12-18'),(3,'2','100','1000',2,'Approved','PO003','2019-12-18');
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
INSERT INTO clients VALUES (1,'Riot Games'),(2,'Samsung'),(3,'Kfc'),(4,'Mcdonals'),(5,'<h1>kek<h1>'),(6,'&lt;h1&gt;kek&lt;h1&gt;'),(7,'H1kekh1'),(8,'Kek');
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
INSERT INTO delivery_tracker VALUES (1,'VN556',1,100,'IN001','PO001',1,100,'1','3',NULL,'2019-12-17',''),(2,'VN557',1,100,'IN002','PO002',1,100,'2','3',NULL,'2019-12-18',''),(3,'VN558',2,100,'IN003','PO003',1,1000,'3','3',NULL,'2019-12-18','');
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
INSERT INTO inventory VALUES (1,1,100,'2019-12-17',3000),(2,1,100,'2019-12-18',1000),(3,2,100,'2019-12-18',1000);
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
INSERT INTO material_types VALUES (1,'Plastic'),(2,'Wood'),(3,'Acrylic'),(4,'Metal'),(5,'Bronze'),(6,'Gold'),(7,'Sterling'),(8,'Cactus');
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
INSERT INTO materials VALUES (1,'2x4',2,1,1),(2,'2x4',1,1,1),(3,'Tent',3,1,1),(4,'5x2',2,1,1);
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
INSERT INTO project_materials VALUES (1,1,1,100),(2,1,2,100),(3,1,2,100),(4,1,1,1),(5,2,1,100);
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
INSERT INTO projects VALUES (1,1,'P1','2020-01-20','Pending'),(2,2,'P2','2020-01-20','Pending');
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
INSERT INTO stockman_release_requests VALUES (1,'1','1','100','Approved','2019-12-18',3,1,'2019-12-18'),(2,'2','2','100','Approved','2019-12-18',3,1,'2019-12-18'),(3,'1','1','100','Approved','2019-12-18',3,0,NULL);
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
INSERT INTO suppliers VALUES (1,'Ace Hardware','8878888'),(2,'Mcdonalds','88886236'),(3,'Samsung','2448001');
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
INSERT INTO transactions VALUES (1,1,1,100.0000,'2019-12-06','Arrived',10,'P001'),(2,2,1,100.0000,'2019-12-19','Arrived',100,'P002');
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
INSERT INTO unit_of_measures VALUES (1,'pc'),(2,'block'),(3,'pint');
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
INSERT INTO users VALUES (1,'Melody','Goooo','melody_go@dlsu.edu.ph','U2FsdGVkX19CDy6/r0R+PXIyLDuWyxBpmbFcNtSiPdA=',0),(2,'Rebecalyn','Lao','rebecalyn_lao@dlsu.edu.ph','U2FsdGVkX19Y7gb2XVpkBnheS2NLLZsfhXG4J7DIZUQ=',3),(3,'Darren','Tee','darren_tee@dlsu.edu.ph','U2FsdGVkX19YYa+sOn7aF33GDofFaCQQTuucgvK6S9I=',4),(4,'Cas','Go','casper_go@dlsu.edu.ph','U2FsdGVkX1+2jp6zpWCnLaLFmH5AC2ZMgdqecdcGOTI=',1),(5,'Jits','Jitsugen','jits_jitsugen@gmail.com','U2FsdGVkX1+7v7exz+ZuNefxpBwJtv2vbjOer0Wd0is=',3),(6,'Qwe','Qwe','qwe@dlsu.edu.ph','U2FsdGVkX19O2i4UUMtk5mdrMKhKaTy03vr71W3F1pA=',1),(7,'Viktor','Ty','viktor_ty@dlsu.edu.ph','U2FsdGVkX1/Rz6TEw0DcAPkQRpIPe3Q8KuMQkTNxCME=',2),(8,'Phoebe','Chen','feebee@dlsu.edu.ph','U2FsdGVkX18tAIgksObsUIWsa12M1eHEWRGr+c9Ehdo=',1),(9,'A','A','aaa@dlsu.edu.ph','U2FsdGVkX1+xHGMRUY/ntVjaicn3NPVqOM1jee4jo4g=',1);
UNLOCK TABLES;

--
-- Table structure for table `year_tracker`
--

DROP TABLE IF EXISTS year_tracker;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE year_tracker (
  yearID int(11) NOT NULL,
  currYear int(11) NOT NULL,
  PRIMARY KEY (yearID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `year_tracker`
--

LOCK TABLES year_tracker WRITE;
INSERT INTO year_tracker VALUES (1,2019);
UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
