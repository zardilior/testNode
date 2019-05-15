use example;
drop table skills;
create table skills(
    skill varchar(50) not null
);
drop table employees;
create table employees(
    email varchar(50) not null unique,
    password varchar(50) not null
);
#drop table subscriptions;
create table subscriptions(
    email varchar(50) not null unique
);
#drop table employees_skills;
create table employees_skills(
    skill varchar(50) not null,
    email_employee int unsigned not null 
);
#drop table subscriptions_skills;
create table subscriptions_skills(
    varchar(50) not null,
    email_subscription varchar(50) not null unique,
);
