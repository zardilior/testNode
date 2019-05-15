use example;
create table skills(
    skill varchar(50) not null
);
create table employees_skills(
    id_skill varchar(50) not null,
    id_employee int unsigned not null 
);
create table employees(
    id int unsigned not null autoincrement,
    email varchar(50) not null unique,
    password varchar(50) not null
)
create table subscription(
    email varchar(50) not null unique,
)
create table subscriptions_skills(
    id_skill varchar(50) not null,
    id_subscription varchar(50) not null unique,
);
