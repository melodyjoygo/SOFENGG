CREATE DATABASE  IF NOT EXISTS `typericer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `typericer`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: typericer
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
-- Table structure for table `easy`
--

DROP TABLE IF EXISTS `easy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `easy` (
  `ideasy` int(11) NOT NULL,
  `idusers` int(11) DEFAULT NULL,
  `wpm` float DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  PRIMARY KEY (`ideasy`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `easy`
--

INSERT INTO `easy` VALUES (1,1,45.12,30,99.91);
INSERT INTO `easy` VALUES (2,2,33.54,45,78.3);
INSERT INTO `easy` VALUES (3,4,34.22,38,100);
INSERT INTO `easy` VALUES (4,3,25.81,44,98.51);

--
-- Table structure for table `hard`
--

DROP TABLE IF EXISTS `hard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hard` (
  `idhard` int(11) NOT NULL,
  `idusers` int(11) DEFAULT NULL,
  `wpm` float DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  PRIMARY KEY (`idhard`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hard`
--

INSERT INTO `hard` VALUES (1,1,20.98,56,78.99);
INSERT INTO `hard` VALUES (2,3,33.33,54,85.74);

--
-- Table structure for table `medium`
--

DROP TABLE IF EXISTS `medium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medium` (
  `idmedium` int(11) NOT NULL,
  `idusers` int(11) DEFAULT NULL,
  `wpm` float DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  PRIMARY KEY (`idmedium`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medium`
--

INSERT INTO `medium` VALUES (1,5,34.54,19,90.89);
INSERT INTO `medium` VALUES (2,6,34.51,23,98.34);
INSERT INTO `medium` VALUES (3,7,65.34,54,89);
INSERT INTO `medium` VALUES (4,8,32.54,33,65.45);

--
-- Table structure for table `texts`
--

DROP TABLE IF EXISTS `texts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `texts` (
  `idtexts` int(11) NOT NULL,
  `title` varchar(45) NOT NULL,
  `texts` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`idtexts`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `texts`
--

INSERT INTO `texts` VALUES (1,'Respect','When we have respect for ourselves and others, we gravitate towards connections that encourage that.');
INSERT INTO `texts` VALUES (2,'Positive Philosophy','A positive philosophy turns into a positive attitude, which turns into positive actions, which turns into positive results, which turns into a positive lifestyle. A positive life.');
INSERT INTO `texts` VALUES (3,'Formula for Success','I can give you a six-word formula for success: Think things through, then follow through.');
INSERT INTO `texts` VALUES (4,'Live','One must live the way one thinks or end up thinking the way one has lived.');
INSERT INTO `texts` VALUES (5,'Purpose','Adhere to your purpose and you will soon feel as well as you ever did. On the contrary, if you falter, and give up, you will lose the power of keeping any resolution, and will regret it all your life.');
INSERT INTO `texts` VALUES (6,'Chocolates','Mama always said life was like a box of chocolates. You never know what you\'re gonna get.');
INSERT INTO `texts` VALUES (7,'Lucky','You\'ve got to ask yourself one question: \'Do I feel lucky?\' Well, do ya, punk?');
INSERT INTO `texts` VALUES (8,'Present','Quit, don\'t quit? Noodles, don\'t noodles? You are too concerned about what was and what will be. There is a saying: yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.');
INSERT INTO `texts` VALUES (9,'Bondage','Why so you can lock me up? Nah. Just bury me in the ocean with my ancestors who jumped from ships, \'cause they knew death was better than bondage.');
INSERT INTO `texts` VALUES (10,'Pain','Listen to the pain. It\'s both history teacher and fortune teller. Pain teaches us who we are, Wade. Sometimes, it\'s so bad, we feel like we\'re dying. But we can\'t really live till we\'ve died a little, can we? Wade? Wade?');
INSERT INTO `texts` VALUES (11,'Rocking Chair','I learned a long time ago that worrying is like a rocking chair. It gives you something to do but it doesn’t get you anywhere.');
INSERT INTO `texts` VALUES (12,'Squishy','I shall call him Squishy. And he shall be mine. And he shall be MY Squishy.');
INSERT INTO `texts` VALUES (13,'Obi-Wan Kenobi','Help me, Obi-Wan Kenobi. You\'re my only hope.');
INSERT INTO `texts` VALUES (14,'Hundred','If you live to be a hundred, I want to live to be a hundred minus one day, so I never have to live without you.');

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `gamesplayed` int(11) DEFAULT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES (1,'jeff','ffej',2);
INSERT INTO `users` VALUES (2,'lodi','ydomel',2);
INSERT INTO `users` VALUES (3,'stan','stanley',1);
INSERT INTO `users` VALUES (4,'myles','myles',1);
INSERT INTO `users` VALUES (5,'erika','erika',1);
INSERT INTO `users` VALUES (6,'shy','shyrene',1);
INSERT INTO `users` VALUES (7,'jaime','hime',1);
INSERT INTO `users` VALUES (8,'test','test',1);
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-15 10:17:49
