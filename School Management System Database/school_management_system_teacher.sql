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
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `subject` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'Ugrtr','Female','1990-02-21','Bangla','Ngphqj'),(2,'Pgkhex','Female','1990-02-21','English','Eiclarl'),(3,'Bimjka','Female','1990-02-21','Chemistry','Elvw'),(4,'Ybhff','Male','1990-02-21','Chemistry','Tceqrld'),(5,'Xxwplk','Female','1990-02-21','English','Ptdfq'),(6,'Gnwwrw','Male','1990-02-21','English','Fficil'),(7,'Xmsep','Female','1990-02-21','Math','Wtccg'),(8,'Ttmc','Male','1990-02-21','Math','Ggkk'),(9,'Mthfbqa','Female','1990-02-21','Physics','Ilgvne'),(10,'Uvwv','Female','1990-02-21','Physics','Dgvm'),(11,'Vvsytw','Male','1990-02-21','Chemistry','Qvgqnq'),(12,'Qdsiitu','Female','1990-02-21','Bangla','Hlikxl'),(13,'Qcol','Male','1990-02-21','Math','Uqyty'),(14,'Qwpiw','Male','1990-02-21','Math','Wsavhs'),(15,'Qgfiyu','Female','1990-02-21','English','Cweddgw'),(16,'Epmq','Female','1990-02-21','Physics','Whvgrr'),(17,'Vqsresg','Male','1990-02-21','Bangla','Rkwgq'),(18,'Wgmtk','Male','1990-02-21','Physics','Jlcep'),(19,'Ifakyq','Male','1990-02-21','English','Ktood'),(20,'Inpkft','Female','1990-02-21','Bangla','Lgxxvnx'),(21,'Drbfy','Female','1990-02-21','Bangla','Wzjt'),(22,'Kopg','Female','1990-02-21','Math','Omscjn'),(23,'Fhssnl','Female','1990-02-21','Math','Wxzgd'),(24,'Fcvwxw','Male','1990-02-21','Bangla','Mltmdfp'),(25,'Juvwu','Male','1990-02-21','Chemistry','Jorso'),(26,'Mojdmd','Female','1990-02-21','Math','Vcwdar'),(27,'Yevvruc','Female','1990-02-21','Math','Rldft'),(28,'Glokilg','Male','1990-02-21','Physics','Oivje'),(29,'Fygg','Male','1990-02-21','English','Joqouk'),(30,'Hphpe','Male','1990-02-21','English','Swegsw'),(31,'Dshff','Male','1990-02-21','Math','Msfvq'),(32,'Prnog','Female','1990-02-21','Math','Lemyhp'),(33,'Jpuhb','Male','1990-02-21','Chemistry','Ykby'),(34,'Tprqge','Female','1990-02-21','Chemistry','Xgobmh'),(35,'Wulvthc','Female','1990-02-21','Bangla','Imko'),(36,'Roujkwf','Male','1990-02-21','English','Iuynqp'),(37,'Tmcz','Female','1990-02-21','Chemistry','Qaci'),(38,'Shecw','Male','1990-02-21','Math','Rnohr'),(39,'Awkj','Female','1990-02-21','Physics','Ncvyiq'),(40,'Itxgmr','Male','1990-02-21','Bangla','Fjhgj'),(41,'Bfxyc','Male','1990-02-21','Bangla','Ktps'),(42,'Nbrio','Female','1990-02-21','Physics','Midrbc'),(43,'Stqwm','Male','1990-02-21','Math','Dsjqb'),(44,'Pecxkf','Male','1990-02-21','Chemistry','Dyjyt'),(45,'Ruylhah','Male','1990-02-21','Chemistry','Yhnscfu'),(46,'Qpzged','Female','1990-02-21','Bangla','Pufrr'),(47,'Tfrtt','Female','1990-02-21','Physics','Hckva'),(48,'Xgmqt','Male','1990-02-21','Math','Mxfddd'),(49,'Auwb','Male','1990-02-21','Chemistry','Lattp'),(50,'Vyffj','Male','1990-02-21','Physics','Qdrywm'),(51,'Bjqconx','Female','1990-02-21','English','Eqstqv'),(52,'Dxfhs','Female','1990-02-21','Bangla','Rrjuz'),(53,'Ppez','Male','1990-02-21','Bangla','Lsgcq'),(54,'Vvtfru','Male','1990-02-21','Bangla','Svaotfq'),(55,'Tmdek','Male','1990-02-21','Math','Iqipbm'),(56,'Wpkdk','Male','1990-02-21','Bangla','Pkfvo'),(57,'Oxwohro','Male','1990-02-21','Math','Klxjz'),(58,'Wkkwd','Male','1990-02-21','English','Iclvbou'),(59,'Kchbiot','Female','1990-02-21','Bangla','Wqmpl'),(60,'Gwtdko','Female','1990-02-21','Chemistry','Btqxq'),(61,'Lcypcs','Male','1990-02-21','Physics','Eqrld'),(62,'Mkpudhz','Female','1990-02-21','Chemistry','Qyywm'),(63,'Juyjz','Female','1990-02-21','Bangla','Qtvxdu'),(64,'Parent1','Male','2022-08-10','Bangla','Zwmulv'),(65,'Parent1','Male','2022-08-10','Bangla','Wsawhwo'),(66,'Parent1','Male','2022-08-10','Bangla','Hstsj'),(67,'Parent1','Male','2022-08-10','Bangla','Naotfp'),(68,'Nobita','Male','2022-08-26','Physics',NULL),(69,'Sunio','Male','2022-08-03','Physics','doraemon');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15  9:08:29
