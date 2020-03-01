# ProTrack

This project is created to manage the complete lifecycle of a project in IT companies.

This project was generated with:-

[Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

[Nodejs](https://nodejs.org/en/docs/) version 12.14.0.

[MySql](https://dev.mysql.com/doc/) version 8.0.18.

##Introduction

The advent of ERP systems has led the tech giants to cut down the operational costs and to manage their production environment with ease. ERP systems are quite popular among the leading companies, be it of any bacckground. But, with the governments over the world, actively working on the ease of doing business, many startups and medium level organisations have come into business. These small scale companies or startups find it difficult to manage the projects. Due to financial incapabilities at the budding stage of the business, they cannot afford to buy an ERP system. 

With a vision to present a next-gen ERP system thatt primarily focuses on the small to medium level entrprises, this project in its very first version prsesnts all the functionalities that are necessary for effective project management.

## Project Overview

The project is dividded into three modules :-

> **ADMIN Module**

> **PVG (Product Validation Group) Module**

> **PU (Production Unit) Module**


### ADMIN Module

	The module is the powerhouse of the system.

	The module works as the initiator module.

	It gives the power to a person (administrator) to get the control over the system.

	The  module allows an admin with the :-

    >	Departmental Functions
    >	Project Functions
    >	User Functions.
    >	Role Functions
    >	The admin is responsible to add user to the system.
    >	The admin will be responsible to assign a role to the created user.
    >	The admin can create and delete a department from the system.
    >	The admin can initiate a new project in the system.
    >	The admin can assign the project to the managers of the department.

### PU(Production Unit) Module

	The PU module allows for the structural division of the organisation.

	The PU module refers to the production unit.

	The Production Unit has users at various levels and are designated a task to develop a software product as per the needs.

	The Production Manager will be assigned a project by the admin of the system.

	The Project Manager can in turn delegate the responsibility amongst the team members under him.

	The Production Unit employees can then perform all day to day requirement operation on the system.

	The system will allow the users at all the levels to:

    >	Raise Bugs
    >	View Iteration Reports
    >	Manage Documentation

### PVG (Product Validation Group) Module

	The PVG module allows for the structural division of the organisation.

	The PVG module refers to the Product Validation Group.

	The unit has users at various levels and are designated a task to check a software product for quality assurance.

	The Manager will be assigned a project by the admin of the system.

	The Project Manager can in turn delegate the responsibility amongst the team members under him.

	The Employees can then perform all day to day requirement operation on the system.

	The system will allow the users at all the levels to:

    >	Raise Bugs
    >	View Iteration Reports
    >	Manage Documentation


## Database Design

**1) User table**

| Field | Type | Null | Constraints | Extra |
| --- | --- | --- | --- | --- |
| user\_id | int(11) | NO | PRIMARY KEY | auto\_increment(1001) |
| role\_id | varchar(50) | YES | MUL |   |
| phone\_no | varchar(15) | NO | UNI |   |
| Password | varchar(200) | NO |   |   |
| Lname | varchar(50) | NO |   |   |
| Fname | varchar(50) | NO |   |   |
| email\_id | varchar(50) | NO | UNIQUE |   |
| department\_id | varchar(10) | NO | Foreign Key department(department\_id) |   |


**2) Department Table**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| department\_id | varchar(20) | NO | PRIMARY KEY |   |
| department\_name | varchar(50) | NO | UNIQUE |   |


**3) Roles Table**

| Field | Type | Null | Constraints | Extra |
| --- | --- | --- | --- | --- |
| department\_id | varchar(10) | YES | Foreign Key Department(Department\_id) |   |
| role\_id | varchar(20) | NO | PRIMARY KEY |   |
| rol\_name | varchar(50) | NO |   |   |


**4) Project Table**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| project\_id | varchar(50) | NO | PRIMARY KEY |   |
| project\_name | varchar(100) | NO |   |   |
| Client | varchar(100) | NO |   |   |
| initial\_department\_id | varchar(10) | YES | Foreign key department(department\_id) |   |
| start\_date | date | NO |   |   |
| Status | varchar(20) | NO |   |   |
| current\_department | varchar(50) | NO |   |   |
| currently\_assigned\_user | int(11) | NO | Foreign key user(user\_id) |   |


**5) Pro\_project\_id Table**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| iteration\_no | int(10) | NO | PRIMARY KEY | auto\_increment |
| previous\_department | varchar(20) | NO | Foreign key department(department\_id) |   |
| current\_department | varchar(20) | NO | Foreign key department(department\_id) |   |
| assigned\_date | date | NO |   |   |
| assigned\_user | int(11) | NO | Foreign key user(user\_id) |   |
| assigned\_by | int(11) | NO | Foreign key user(user\_id) |   |
| Status | varchar(20) | NO |   |   |


**6) Documents\_project\_name**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| iteration\_no | int(11) | NO | PRI |   |
| Srs | varchar(3000) | YES |   |   |
| srs\_upload\_date | varchar(100) | YES |   |   |
| srs\_description | varchar(100) | YES |   |   |
| srs\_upload\_by | int(11) | YES | Foreign key user(user\_id) |   |
| installation\_guide | varchar(3000) | YES |   |   |
| installation\_guide\_upload\_date | varchar(100) | YES |   |   |
| installation\_guide\_description | varchar(100) | YES |   |   |
| installation\_guide\_upload\_by | int(11) | YES | Foreign key user(user\_id) |   |
| test\_plan | varchar(3000) | YES |   |   |
| test\_plan\_upload\_date | varchar(100) | YES |   |   |
| test\_plan\_description | varchar(100) | YES |   |   |
| test\_plan\_upload\_by | int(11) | YES | Foreign key user(user\_id) |   |
| document4 | varchar(3000) | YES |   |   |
| document4\_type | varchar(50) | YES |   |   |
| document4\_upload\_date | varchar(100) | YES |   |   |
| document4\_description | varchar(100) | YES |   |   |
| document4\_upload\_by | int(11) | YES | Foreign key user(user\_id) |   |
| document5 | varchar(3000) | YES |   |   |
| document5\_type | varchar(50) | YES |   |   |
| document5\_upload\_date | varchar(100) | YES |   |   |
| document5\_description | varchar(100) | YES |   |   |
| document5\_upload\_by | int(11) | YES | Foreign key user(user\_id) |   |


**7) Defects\_project\_name**

| iteration\_no | int(11) | YES | MUL |   |   |
| --- | --- | --- | --- | --- | --- |
| defect\_id | int(11) | NO | PRI |   | auto\_increment |
| defect\_name | varchar(50) | NO |   |   |   |
| defect\_category | varchar(50) | NO | MUL |   |   |
| defect\_type | varchar(50) | NO | MUL |   |   |
| Status | varchar(20) | NO | MUL |   |   |
| description | varchar(200) | NO |   |   |   |
| log\_data | varchar(1000) | YES |   |   |   |
| assigned\_department | varchar(20) | YES | MUL |   |   |
| assigned\_user | int(11) | YES | MUL |   |   |
| Date | date | YES |   |   |   |
| assign\_status | int(11) | NO |   |   |   |


**8) Defect\_category**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| category\_id | int(10) | NO | PRIMARY KEY | auto\_increment |
| Category\_name | varchar(50) | NO |   |   |


**9) Defect\_type**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| type\_id | int(10) | NO | PRIMARY KEY | auto\_increment |
| type\_name | varchar(50) | NO |   |   |


**10) Defect\_status**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| status\_id | int(11) | NO | PRIMARY KEY |   |
| Status | varchar(20) | NO | UNIQUE |   |


**11) Users\_project\_id**

| Field | Type | Null | Constraint | Extra |
| --- | --- | --- | --- | --- |
| Sno | int(11) | NO | PRIMARY KEY |   |
| Iteration\_no | varchar(20) | NO |   |   |
| User\_id |   |   |   |   |

## Development server

The app is built to run on two servers i.e one server ffor the Node.js backend and the other server for the Angular Frontend.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `npm run start:server` for a nodejs backend server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

You can change the server ip addresses inside the environment.ts file in environment folder in the root directory.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
