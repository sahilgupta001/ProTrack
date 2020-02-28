-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: compass
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `compass`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `compass` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `compass`;

--
-- Table structure for table `defect_category`
--

DROP TABLE IF EXISTS `defect_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defect_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defect_category`
--

LOCK TABLES `defect_category` WRITE;
/*!40000 ALTER TABLE `defect_category` DISABLE KEYS */;
INSERT INTO `defect_category` VALUES (113,'enhancement'),(111,'functional'),(112,'non-functional'),(114,'others');
/*!40000 ALTER TABLE `defect_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defect_status`
--

DROP TABLE IF EXISTS `defect_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defect_status` (
  `status_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defect_status`
--

LOCK TABLES `defect_status` WRITE;
/*!40000 ALTER TABLE `defect_status` DISABLE KEYS */;
INSERT INTO `defect_status` VALUES (2,'closed'),(1,'open');
/*!40000 ALTER TABLE `defect_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defect_type`
--

DROP TABLE IF EXISTS `defect_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defect_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_name` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defect_type`
--

LOCK TABLES `defect_type` WRITE;
/*!40000 ALTER TABLE `defect_type` DISABLE KEYS */;
INSERT INTO `defect_type` VALUES (112,'major'),(114,'medium'),(113,'minor'),(111,'severe');
/*!40000 ALTER TABLE `defect_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defects_pu_project_1`
--

DROP TABLE IF EXISTS `defects_pu_project_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defects_pu_project_1` (
  `iteration_no` int(11) DEFAULT NULL,
  `defect_id` int(11) NOT NULL AUTO_INCREMENT,
  `defect_name` varchar(50) NOT NULL,
  `defect_category` varchar(50) NOT NULL,
  `defect_type` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `log_data` varchar(1000) DEFAULT NULL,
  `assigned_department` varchar(20) DEFAULT NULL,
  `assigned_user` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `assign_status` int(11) NOT NULL,
  PRIMARY KEY (`defect_id`),
  KEY `iteration_no` (`iteration_no`),
  KEY `defect_category` (`defect_category`),
  KEY `defect_type` (`defect_type`),
  KEY `status` (`status`),
  KEY `assigned_department` (`assigned_department`),
  KEY `assigned_user` (`assigned_user`),
  CONSTRAINT `defects_pu_project_1_ibfk_1` FOREIGN KEY (`iteration_no`) REFERENCES `pro_pu_project_1` (`iteration_no`),
  CONSTRAINT `defects_pu_project_1_ibfk_2` FOREIGN KEY (`defect_category`) REFERENCES `defect_category` (`category_name`),
  CONSTRAINT `defects_pu_project_1_ibfk_3` FOREIGN KEY (`defect_type`) REFERENCES `defect_type` (`type_name`),
  CONSTRAINT `defects_pu_project_1_ibfk_4` FOREIGN KEY (`status`) REFERENCES `defect_status` (`status`),
  CONSTRAINT `defects_pu_project_1_ibfk_5` FOREIGN KEY (`assigned_department`) REFERENCES `department` (`department_id`),
  CONSTRAINT `defects_pu_project_1_ibfk_6` FOREIGN KEY (`assigned_user`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defects_pu_project_1`
--

LOCK TABLES `defects_pu_project_1` WRITE;
/*!40000 ALTER TABLE `defects_pu_project_1` DISABLE KEYS */;
INSERT INTO `defects_pu_project_1` VALUES (3,2,'ndndndndn','non-functional','medium','closed','ndnddb','bdbdbdb','PU_102',1025,'2020-02-14',1),(5,5,'jsjsjsj','enhancement','medium','open','dddd','ddd','PU_102',1021,'2020-02-28',1);
/*!40000 ALTER TABLE `defects_pu_project_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` varchar(20) NOT NULL,
  `department_name` varchar(50) NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `department_name` (`department_name`),
  UNIQUE KEY `department_id` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('admin','Admin'),('PVG_101','Product Validation Group'),('PU_102','Production Unit');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents_pu_project_1`
--

DROP TABLE IF EXISTS `documents_pu_project_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents_pu_project_1` (
  `iteration_no` int(11) NOT NULL,
  `srs` varchar(3000) DEFAULT NULL,
  `srs_upload_date` varchar(100) DEFAULT NULL,
  `srs_description` varchar(100) DEFAULT NULL,
  `srs_upload_by` int(11) DEFAULT NULL,
  `installation_guide` varchar(3000) DEFAULT NULL,
  `installation_guide_upload_date` varchar(100) DEFAULT NULL,
  `installation_guide_description` varchar(100) DEFAULT NULL,
  `installation_guide_upload_by` int(11) DEFAULT NULL,
  `test_plan` varchar(3000) DEFAULT NULL,
  `test_plan_upload_date` varchar(100) DEFAULT NULL,
  `test_plan_description` varchar(100) DEFAULT NULL,
  `test_plan_upload_by` int(11) DEFAULT NULL,
  `document4` varchar(3000) DEFAULT NULL,
  `document4_type` varchar(50) DEFAULT NULL,
  `document4_upload_date` varchar(100) DEFAULT NULL,
  `document4_description` varchar(100) DEFAULT NULL,
  `document4_upload_by` int(11) DEFAULT NULL,
  `document5` varchar(3000) DEFAULT NULL,
  `document5_type` varchar(50) DEFAULT NULL,
  `document5_upload_date` varchar(100) DEFAULT NULL,
  `document5_description` varchar(100) DEFAULT NULL,
  `document5_upload_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`iteration_no`),
  KEY `srs_upload_by` (`srs_upload_by`),
  KEY `installation_guide_upload_by` (`installation_guide_upload_by`),
  KEY `test_plan_upload_by` (`test_plan_upload_by`),
  KEY `document4_upload_by` (`document4_upload_by`),
  KEY `document5_upload_by` (`document5_upload_by`),
  CONSTRAINT `documents_pu_project_1_ibfk_1` FOREIGN KEY (`iteration_no`) REFERENCES `pro_pu_project_1` (`iteration_no`),
  CONSTRAINT `documents_pu_project_1_ibfk_2` FOREIGN KEY (`srs_upload_by`) REFERENCES `user` (`user_id`),
  CONSTRAINT `documents_pu_project_1_ibfk_3` FOREIGN KEY (`installation_guide_upload_by`) REFERENCES `user` (`user_id`),
  CONSTRAINT `documents_pu_project_1_ibfk_4` FOREIGN KEY (`test_plan_upload_by`) REFERENCES `user` (`user_id`),
  CONSTRAINT `documents_pu_project_1_ibfk_5` FOREIGN KEY (`document4_upload_by`) REFERENCES `user` (`user_id`),
  CONSTRAINT `documents_pu_project_1_ibfk_6` FOREIGN KEY (`document5_upload_by`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents_pu_project_1`
--

LOCK TABLES `documents_pu_project_1` WRITE;
/*!40000 ALTER TABLE `documents_pu_project_1` DISABLE KEYS */;
INSERT INTO `documents_pu_project_1` VALUES (1,'pu_project_1-srs-1581624194577.pdf','Fri Feb 14 2020 01:33:14 GMT+0530 (India Standard Time)','aaaaaaaaaaaaaa',1025,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'pu_project_1-srs-1582893117724.pdf',NULL,'1020',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `documents_pu_project_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_pu_project_1`
--

DROP TABLE IF EXISTS `pro_pu_project_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pro_pu_project_1` (
  `iteration_no` int(10) NOT NULL AUTO_INCREMENT,
  `previous_department` varchar(20) NOT NULL,
  `current_department` varchar(20) NOT NULL,
  `assigned_date` date NOT NULL,
  `assigned_user` int(11) NOT NULL,
  `assigned_by` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`iteration_no`),
  KEY `current_department` (`current_department`),
  KEY `previous_department` (`previous_department`),
  KEY `assigned_user` (`assigned_user`),
  KEY `assigned_by` (`assigned_by`),
  CONSTRAINT `pro_pu_project_1_ibfk_1` FOREIGN KEY (`current_department`) REFERENCES `department` (`department_id`),
  CONSTRAINT `pro_pu_project_1_ibfk_2` FOREIGN KEY (`previous_department`) REFERENCES `department` (`department_id`),
  CONSTRAINT `pro_pu_project_1_ibfk_3` FOREIGN KEY (`assigned_user`) REFERENCES `user` (`user_id`),
  CONSTRAINT `pro_pu_project_1_ibfk_4` FOREIGN KEY (`assigned_by`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_pu_project_1`
--

LOCK TABLES `pro_pu_project_1` WRITE;
/*!40000 ALTER TABLE `pro_pu_project_1` DISABLE KEYS */;
INSERT INTO `pro_pu_project_1` VALUES (1,'PU_102','PU_102','2020-02-14',1025,1020,'Initiated'),(2,'PU_102','PU_102','2020-02-14',1025,1020,'Initiated'),(3,'PU_102','PVG_101','2020-02-14',1030,1025,'Final'),(4,'PVG_101','PU_102','2020-02-14',1025,1030,'Final'),(5,'PU_102','PU_102','2020-02-17',1025,1020,'Initiated');
/*!40000 ALTER TABLE `pro_pu_project_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_pvg_project_1`
--

DROP TABLE IF EXISTS `pro_pvg_project_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pro_pvg_project_1` (
  `iteration_no` int(10) NOT NULL AUTO_INCREMENT,
  `previous_department` varchar(20) NOT NULL,
  `current_department` varchar(20) NOT NULL,
  `assigned_date` date NOT NULL,
  `assigned_user` int(11) NOT NULL,
  `assigned_by` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`iteration_no`),
  KEY `current_department` (`current_department`),
  KEY `previous_department` (`previous_department`),
  KEY `assigned_user` (`assigned_user`),
  KEY `assigned_by` (`assigned_by`),
  CONSTRAINT `pro_pvg_project_1_ibfk_1` FOREIGN KEY (`current_department`) REFERENCES `department` (`department_id`),
  CONSTRAINT `pro_pvg_project_1_ibfk_2` FOREIGN KEY (`previous_department`) REFERENCES `department` (`department_id`),
  CONSTRAINT `pro_pvg_project_1_ibfk_3` FOREIGN KEY (`assigned_user`) REFERENCES `user` (`user_id`),
  CONSTRAINT `pro_pvg_project_1_ibfk_4` FOREIGN KEY (`assigned_by`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_pvg_project_1`
--

LOCK TABLES `pro_pvg_project_1` WRITE;
/*!40000 ALTER TABLE `pro_pvg_project_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `pro_pvg_project_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` varchar(50) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `client` varchar(100) NOT NULL,
  `initial_department_id` varchar(10) DEFAULT NULL,
  `start_date` date NOT NULL,
  `status` varchar(20) NOT NULL,
  `current_department` varchar(50) NOT NULL,
  `currently_assigned_user` int(11) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `initial_department_id` (`initial_department_id`),
  KEY `currently_assigned_user` (`currently_assigned_user`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`initial_department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`currently_assigned_user`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('PU_project_1','Compass','Mahindra','PU_102','2020-01-24','Initiated','PU_102',1025),('PVG_project_1','compass','mahindra','PVG_101','2020-02-17','initial','PVG_101',1025);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `department_id` varchar(10) DEFAULT NULL,
  `role_id` varchar(20) NOT NULL,
  `rol_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_id` (`role_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('admin','Admin_01','admin'),('PU_102','PU_ASS_101','Associate'),('PU_102','PU_MNG_104','Manager'),('PU_102','PU_TL_102','Team Lead'),('PVG_101','PVG_ASS_101','Associate'),('PVG_101','PVG_MNG_104','Manager'),('PVG_101','PVG_STL_103','Senior Team Lead'),('PVG_101','PVG_TL_102','Team Lead');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `email_id` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `department_id` varchar(10) NOT NULL,
  `role_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_id` (`email_id`),
  UNIQUE KEY `phone_no` (`phone_no`),
  UNIQUE KEY `phone_no_2` (`phone_no`),
  KEY `department_id` (`department_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1031 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1020,'sahil.gupta26.sg@gmail.com','$2b$10$LYsjwbn1wa.owE9K5ILFXOJzEf6uYDS14VmKZPHBY16fqhj2RSPRy','08447051255','gupta','sahil','admin','admin_01'),(1021,'saaaaa@gmail.com','$2b$10$C7jwZrryp4beqdCwGB394.YObjfwRKE4y2yjgY6mPfS7/Kl4f9hG6','8447051255','guta','sahil','PU_102','PU_ASS_101'),(1024,'sakshi@gmail.com','$2b$10$WLqAi9UdMXf8spX2WJOMSuGPDMqP/tKwlDoDD0EXoZquPzdHDEgLK','555555','gupta','sakshi','PU_102','PU_TL_102'),(1025,'ss@gmail.com','$2b$10$C9UlRLM3n0Ant21lkQ12p.qgj1M0YA64DG6ggvOtJc1OV1rhMi.Pe','777777','jdjdjdj','djjddjj','PU_102','PU_MNG_104'),(1026,'sss@gmail.com','$2b$10$VxgJKoEWgB9pzeO0DMFoWeo8elzM3mCyBERCu4r56x01u/vZxCKG6','845457552644','gupta','sahil','PU_102','PU_TL_102'),(1027,'sm@gmail.com','$2b$10$7cmvQd6huwS.8D6EO6yykOLyy1Bg7yslRdy1IasS5DVHmVZXyKZ7m','54545454555','gupta','sahil','PU_102','PU_MNG_104'),(1030,'ssss@gmail.com','$2b$10$6cgs2OoLRnx1uNavKdxgP.t781bRbdoIexG3hoWeTKapO9lbgEBie','8484858484','gupta','sahil','PVG_101','PVG_MNG_104');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_pu_project_1`
--

DROP TABLE IF EXISTS `users_pu_project_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_pu_project_1` (
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `iteration_no` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`sno`),
  KEY `iteration_no` (`iteration_no`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_pu_project_1_ibfk_1` FOREIGN KEY (`iteration_no`) REFERENCES `pro_pu_project_1` (`iteration_no`),
  CONSTRAINT `users_pu_project_1_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_pu_project_1`
--

LOCK TABLES `users_pu_project_1` WRITE;
/*!40000 ALTER TABLE `users_pu_project_1` DISABLE KEYS */;
INSERT INTO `users_pu_project_1` VALUES (1,4,1021),(2,4,1024),(3,4,1025),(4,5,1026);
/*!40000 ALTER TABLE `users_pu_project_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_pvg_project_1`
--

DROP TABLE IF EXISTS `users_pvg_project_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_pvg_project_1` (
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `iteration_no` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`sno`),
  KEY `iteration_no` (`iteration_no`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `users_pvg_project_1_ibfk_1` FOREIGN KEY (`iteration_no`) REFERENCES `pro_pvg_project_1` (`iteration_no`),
  CONSTRAINT `users_pvg_project_1_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_pvg_project_1`
--

LOCK TABLES `users_pvg_project_1` WRITE;
/*!40000 ALTER TABLE `users_pvg_project_1` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_pvg_project_1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-29  1:39:55
