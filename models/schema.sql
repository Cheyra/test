create database user;
use user;
create table hiker(
user varchar(16) not null primary key,
password varchar(16) not null,
firstName varchar(16),
lastName varchar(16),
displayName varchar(16),
information varchar(200),
imagetext varchar(15)
);

insert into hiker(user, password)
values ("Bob", "Password");
select * from hiker;

create table hike(
user varchar(255), 
mountain varchar(255),
minutestaken int(11), 
hourstaken int(11), 
datehiked datetime, 
difficulty int(11),
)
