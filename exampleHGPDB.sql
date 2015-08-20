CREATE TABLE students (
  id int(11) NOT NULL AUTO_INCREMENT,
  first_name varchar(50),
  last_name varchar(50),
  age int(3),
  grade int(2),
  school varchar(50),
  parent_first_name varchar(50),
  parent_last_name varchar(50),
  address_street varchar(50),
  address_city varchar(50),
  address_state varchar(50),
  address_zipcode varchar(10),
  phone_number varchar(20),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;
