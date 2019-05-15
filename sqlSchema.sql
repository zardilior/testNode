use example;
drop table if exists skills;
create table skills(
    skill varchar(50) not null
);
drop table if exists employees;
create table employees(
    email varchar(50) not null unique,
    password varchar(50) not null
);
drop table if exists subscriptions;
create table subscriptions(
    email varchar(50) not null unique
);
drop table if exists employees_skills;
create table employees_skills(
    skill varchar(50) not null,
    email_employee int unsigned not null 
);
drop table if exists subscriptions_skills;
create table subscriptions_skills(
    skill varchar(50) not null,
    email_subscription varchar(50) not null unique
);
