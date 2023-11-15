-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: school_management_system
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `examination`
--

DROP TABLE IF EXISTS `examination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examination` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `full_marks` int DEFAULT NULL,
  `class` int DEFAULT NULL,
  `subject` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination`
--

LOCK TABLES `examination` WRITE;
/*!40000 ALTER TABLE `examination` DISABLE KEYS */;
INSERT INTO `examination` VALUES (4,'2022-08-01','09:00:00','Class Test',20,10,'Physics'),(5,'2022-08-02','09:00:00','Class Test',20,10,'Physics'),(6,'2022-08-03','09:00:00','Class Test',20,10,'Physics'),(7,'2022-08-04','09:00:00','Class Test',20,10,'Physics'),(8,'2022-08-05','09:00:00','Class Test',20,10,'Physics'),(9,'2022-08-06','09:00:00','Class Test',20,10,'Physics'),(10,'2022-08-07','09:00:00','Half Yearly',100,10,'Physics'),(12,'2022-08-08','09:00:00','Term Final',100,10,'Physics'),(13,'2022-09-02','00:00:00','Term Final',100,10,'Physics'),(14,'2022-09-28','03:00:00','Term Final',100,1,'Bangla'),(15,'2022-09-28','03:04:00','Assignment',100,7,'Bangla'),(16,'2022-09-28','03:04:00','Assignment',100,7,'Bangla'),(17,'2022-09-28','03:04:00','Assignment',100,7,'Bangla'),(18,'2022-09-28','03:04:00','Assignment',100,7,'Bangla'),(19,'2022-09-07','03:46:00','Term Final',100,7,'Bangla');
/*!40000 ALTER TABLE `examination` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15  9:08:30
