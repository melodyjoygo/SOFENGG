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
-- Dumping data for table `clerk_add_request`
--

/*!40000 ALTER TABLE `clerk_add_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `clerk_add_request` ENABLE KEYS */;

--
-- Dumping data for table `clients`
--

/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

--
-- Dumping data for table `delivery_tracker`
--

/*!40000 ALTER TABLE `delivery_tracker` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_tracker` ENABLE KEYS */;

--
-- Dumping data for table `inventory`
--

/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

--
-- Dumping data for table `material_types`
--

/*!40000 ALTER TABLE `material_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_types` ENABLE KEYS */;

--
-- Dumping data for table `materials`
--

/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;

--
-- Dumping data for table `project_materials`
--

/*!40000 ALTER TABLE `project_materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_materials` ENABLE KEYS */;

--
-- Dumping data for table `projects`
--

/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;

--
-- Dumping data for table `request_types`
--

/*!40000 ALTER TABLE `request_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `request_types` ENABLE KEYS */;

--
-- Dumping data for table `requests`
--

/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;

--
-- Dumping data for table `stockman_edit_requests`
--

/*!40000 ALTER TABLE `stockman_edit_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockman_edit_requests` ENABLE KEYS */;

--
-- Dumping data for table `stockman_release_requests`
--

/*!40000 ALTER TABLE `stockman_release_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockman_release_requests` ENABLE KEYS */;

--
-- Dumping data for table `suppliers`
--

/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;

--
-- Dumping data for table `transactions`
--

/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

--
-- Dumping data for table `unit_of_measures`
--

/*!40000 ALTER TABLE `unit_of_measures` DISABLE KEYS */;
INSERT INTO `unit_of_measures` VALUES (1,'pcs');
INSERT INTO `unit_of_measures` VALUES (2,'bags');
INSERT INTO `unit_of_measures` VALUES (3,'pale');
INSERT INTO `unit_of_measures` VALUES (4,'lot');
INSERT INTO `unit_of_measures` VALUES (5,'tins');
INSERT INTO `unit_of_measures` VALUES (6,'panels');
INSERT INTO `unit_of_measures` VALUES (7,'gals');
INSERT INTO `unit_of_measures` VALUES (8,'sets');
INSERT INTO `unit_of_measures` VALUES (9,'boxes');
INSERT INTO `unit_of_measures` VALUES (10,'meters');
INSERT INTO `unit_of_measures` VALUES (11,'bottle');
INSERT INTO `unit_of_measures` VALUES (12,'can');
INSERT INTO `unit_of_measures` VALUES (13,'liter');
INSERT INTO `unit_of_measures` VALUES (14,'others');
/*!40000 ALTER TABLE `unit_of_measures` ENABLE KEYS */;

--
-- Dumping data for table `user_types`
--

/*!40000 ALTER TABLE `user_types` DISABLE KEYS */;
INSERT INTO `user_types` VALUES (0,'Super Admin');
INSERT INTO `user_types` VALUES (1,'User Admin');
INSERT INTO `user_types` VALUES (2,'Admin');
INSERT INTO `user_types` VALUES (3,'Purchasing');
INSERT INTO `user_types` VALUES (4,'Stockman');
/*!40000 ALTER TABLE `user_types` ENABLE KEYS */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Melody','Goooo','melody_go@dlsu.edu.ph','U2FsdGVkX19CDy6/r0R+PXIyLDuWyxBpmbFcNtSiPdA=',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

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

-- Dump completed on 2020-01-26 21:47:10
