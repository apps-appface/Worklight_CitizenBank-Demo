-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 19, 2015 at 12:12 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `WorkCover`
--

-- --------------------------------------------------------

--
-- Table structure for table `CURRENCY_CERTIFICATE_REQUEST`
--

CREATE TABLE IF NOT EXISTS `CURRENCY_CERTIFICATE_REQUEST` (
  `notice_number` varchar(20) NOT NULL,
  `registered_name` varchar(30) NOT NULL,
  `business_name` varchar(45) NOT NULL,
  `abn` varchar(20) NOT NULL,
  `building_name` varchar(30) NOT NULL,
  `number` varchar(20) NOT NULL,
  `street_name` varchar(25) NOT NULL,
  `suburb` varchar(20) NOT NULL,
  `state` varchar(25) NOT NULL,
  `post_code` varchar(10) NOT NULL,
  `officer_name` varchar(30) NOT NULL,
  `officer_address` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `notice_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `CURRENCY_CERTIFICATE_REQUEST`
--

INSERT INTO `CURRENCY_CERTIFICATE_REQUEST` (`notice_number`, `registered_name`, `business_name`, `abn`, `building_name`, `number`, `street_name`, `suburb`, `state`, `post_code`, `officer_name`, `officer_address`, `date`, `notice_id`) VALUES
('Notice Number', 'Name', 'Business Name', 'abn', 'Building Name', 'street number', 'Street name', 'suburb', 'state4', '575575', 'Officer Name', 'Officer Address', '2015-02-18', 1);

-- --------------------------------------------------------

--
-- Table structure for table `RESPONSE_VERIFICATION_CHECKLIST`
--

CREATE TABLE IF NOT EXISTS `RESPONSE_VERIFICATION_CHECKLIST` (
  `pcbu_location` varchar(20) NOT NULL,
  `pcbu_size` varchar(20) NOT NULL,
  `pcbu_ara_letter` bit(1) NOT NULL,
  `ara_issues_resolved` bit(1) NOT NULL,
  `action_ara_letter` varchar(20) DEFAULT NULL,
  `pcbu_consultation_mechanism` varchar(8) NOT NULL,
  `pcbu_engage_workers` varchar(8) NOT NULL,
  `additional_issues_identified` bit(1) NOT NULL,
  `additional_issue_details` varchar(45) DEFAULT NULL,
  `additional_issue_action` varchar(20) DEFAULT NULL,
  `workcover_products` varchar(20) NOT NULL,
  `ara_comments` varchar(200) NOT NULL,
  `arvc_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `RESPONSE_VERIFICATION_CHECKLIST`
--

INSERT INTO `RESPONSE_VERIFICATION_CHECKLIST` (`pcbu_location`, `pcbu_size`, `pcbu_ara_letter`, `ara_issues_resolved`, `action_ara_letter`, `pcbu_consultation_mechanism`, `pcbu_engage_workers`, `additional_issues_identified`, `additional_issue_details`, `additional_issue_action`, `workcover_products`, `ara_comments`, `arvc_id`) VALUES
('location', 'size', '', '\0', 'action', 'na', 'yes', '', 'issueDetails', 'action', 'products', 'comments', 1),
('location', 'size', '', '\0', 'action', 'na', 'yes', '', 'issueDetails', 'action', 'products', 'comments', 2),
('option4', 'option3', '', '\0', 'option4', 'Yes', 'NA', '', 'issues', 'option3', 'option1', 'comments', 3),
('option4', 'option3', '', '\0', 'option2', 'No', 'NA', '', 'Hi', 'option4', 'option1', 'Comments', 4),
('option4', 'option1', '', '\0', 'option3', 'No', 'NA', '', 'issues', 'option3', 'option4', 'comments', 5);

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

CREATE TABLE IF NOT EXISTS `USER` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(25) DEFAULT NULL,
  `user_password` varchar(25) DEFAULT NULL,
  `user_role` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`user_id`, `user_name`, `user_password`, `user_role`) VALUES
(1, 'dexter', 'dexter', 'admin'),
(2, 'max', 'max', 'inspector');

-- --------------------------------------------------------

--
-- Table structure for table `WORKER_DETAIL`
--

CREATE TABLE IF NOT EXISTS `WORKER_DETAIL` (
  `name` varchar(30) NOT NULL,
  `date_of_birth` date NOT NULL,
  `has_licence` bit(1) NOT NULL,
  `hrw_licence_number` varchar(20) DEFAULT NULL,
  `licence_jurisdiction` varchar(30) DEFAULT NULL,
  `has_enrolled_training` varchar(8) DEFAULT NULL,
  `hrw_card_expiry_date` date NOT NULL,
  `licence_classes` varchar(45) NOT NULL,
  `gls_date` date NOT NULL,
  `licence_validity` bit(1) NOT NULL,
  `rfs_consultation` varchar(8) NOT NULL,
  `notices_issued` varchar(45) NOT NULL,
  `comments` varchar(200) NOT NULL,
  `form_submitted` bit(1) NOT NULL DEFAULT b'0',
  `user_role` varchar(20) DEFAULT NULL,
  `worker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `WORKER_DETAIL`
--

INSERT INTO `WORKER_DETAIL` (`name`, `date_of_birth`, `has_licence`, `hrw_licence_number`, `licence_jurisdiction`, `has_enrolled_training`, `hrw_card_expiry_date`, `licence_classes`, `gls_date`, `licence_validity`, `rfs_consultation`, `notices_issued`, `comments`, `form_submitted`, `user_role`, `worker_id`) VALUES
('vamsi', '2020-02-16', '\0', '', '', 'Yes', '2020-02-16', '56637424', '2031-02-16', '', 'Yes', '4636522', 'Gregg RSS fer rtf HTCcv ', '', 'Admin', 4),
('Anji', '1998-02-16', '', '367377365', 'this is ', NULL, '2020-02-16', '584572', '2020-02-16', '', 'No', '4636353', 'He''ll world with help me', '\0', 'Inspector', 12),
('Hanuman', '2015-02-12', '', '3554 455', 'yerfgyhfts', NULL, '2015-03-12', '45deertygrr', '2013-08-27', '', 'N/A', 'rttrffrtccg t  y  h f g', 'Hello world rest 1233', '\0', 'Inspector', 13),
('Rahul', '2006-02-16', '', '3645255', 'Tanya text', NULL, '2010-02-16', '3673663', '2024-02-16', '', 'No', '36463663', 'Hello world this is testingnsw', '', 'Admin', 14),
('siri', '2015-02-10', '\0', '', '', 'No', '2015-03-03', '467433355', '2015-02-16', '\0', 'N/A', 'hello world', 'Tjisbusvtee\nTestimg ', '\0', 'Admin', 15),
('Rammi', '2017-02-16', '', 'rtyrry6tt', 'rtycfffvgdss', NULL, '2020-02-16', '367366344', '2008-02-16', '', 'N/A', 'Hello world test it properly', 'Hello world this is testing', '', 'Inspector', 16),
('worker', '2014-12-24', '', 'rut67ytggfg', 'fhutfhbrff', NULL, '2014-12-24', '677846466', '2014-07-23', '', 'N/A', 'heloo worker', 'Th7s ud comments', '\0', 'Admin', 18),
('Simulate', '2015-02-04', '', '34535345', '345435345334', NULL, '2015-06-14', '3453535', '2015-02-13', '', 'N/A', '3453534534534', '34534534534\n345\n34\n543\n543\n5\n435\n43\n543345345345345\n43\n5\n435\n435\n\n435\n43543\n5\n45\n435\n4\n54543\n5\n43\n543\n54\n53534\n534\n5\n43\n5\n43\n54\n35\n435\n43\n5\n4\n543\n5\n34\n5\n34\n543\n5435\n5\n6\n565\n\n65767\n6\n65', '\0', 'Admin', 19),
('None', '3453-02-03', '', '3453445', '43535', NULL, '5333-03-04', '345435435', '5565-03-04', '', 'N/A', '34534543', 'Mobile First comments', '', 'Admin', 20),
('456', '4554-04-05', '', '45646', '456456', NULL, '6437-04-05', '456456', '4344-04-05', '', 'N/A', '45646', '456456\n456\n5465465', '', 'Inspector', 22);
