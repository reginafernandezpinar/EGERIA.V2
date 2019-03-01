DROP DATABASE IF EXISTS egeria;
CREATE DATABASE egeria;
USE egeria;

-- Table structure for table `trip`
CREATE TABLE trip (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(400) NULL,
    companionship VARCHAR(20) NOT NULL, -- solo, couple, family
    photo VARCHAR(200) null, -- url
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- Table structure for table `track`
CREATE TABLE track (
    id INT NOT NULL AUTO_INCREMENT,
    trip_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500) NULL,
    starting_point VARCHAR (50) NOT NULL,
    destination_point VARCHAR(50) NOT NULL,
    photo VARCHAR(200) null, -- url
    distance FLOAT (10, 2) NOT NULL, -- num de km
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY trip_fk(trip_id) REFERENCES trip(id)
);

-- Table structure for table `trackpoint`
CREATE TABLE trackpoint (
    id INT NOT NULL AUTO_INCREMENT,
    track_id INT NOT NULL,
    name VARCHAR(500) NOT NULL,
    lat INT NOT NULL,
    lon INT NOT NULL,
    description VARCHAR(500) NULL,
    type VARCHAR(20) NOT NULL, -- panoramic, monument, animal observationn
    photo VARCHAR(200) NULL, -- url
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY track_fk(track_id) REFERENCES track(id)
);



------------------ TRIP DATA -----------------------------

INSERT INTO trip (name, description, companionship, photo) values ('Rome', 'Trip to Rome', 'couple', 'https://lonelyplanetimages.imgix.net/mastheads/stock-photo-roman-sunset-77415821.jpg?sharp=10&vib=20&w=1200');
INSERT INTO trip (name, description, companionship, photo) values ('Japan', 'Planning trip to Japan', 'couple', 'https://www.asgam.com/wp-content/uploads/2018/12/japan.jpg');
INSERT INTO trip (name, description, companionship, photo) values ('Spain', 'A roadtrip in Spain', 'family', 'https://www.telegraph.co.uk/content/dam/Travel/2017/December/zahara-GettyImages-620354288.jpg?imwidth=450');
INSERT INTO trip (name, description, companionship, photo) values ('Andalucia', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'couple', 'https://www.planetware.com/photos-large/E/spain-sierra-nevada-capileira.jpg');
INSERT INTO trip (name, description, companionship, photo) values ('Canada', 'Planning trip to Lorem ipsum dolor sit amet, consectetur adipiscing', 'couple', 'https://i1.wp.com/viajesazulmarino.com/blog/wp-content/uploads/canada_.png?resize=913%2C607&ssl=1');
INSERT INTO trip (name, description, companionship, photo) values ('Iceland', 'A roadtrip in Lorem ipsum dolor sit amet, consectetur', 'family', 'http://geographical.co.uk/media/k2/items/cache/0c84ab19d43307514d9470b51a44e5d3_XL.jpg');
INSERT INTO trip (name, description, companionship, photo) values ('Granada', 'Planning trip to Lorem ipsum dolor sit amet', 'couple', 'http://www.turgranada.es/wp-content/blogs.dir/2/files_mf/cache/th_8e735c5fb9f20d17096a998987c257d7_sierra-nevada0.jpg?x53512');
INSERT INTO trip (name, description, companionship, photo) values ('France', 'A roadtrip Lorem ipsum dolor sit amet, consectetur', 'family', 'https://cdn1.guias-viajar.com/wp-content/uploads/2017/08/Castillo-Najac-FB-011.jpg');


--------------- TRACK DATA -----------------------------

INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (3, 'granada', 'visit to Alhambra', 'Malaga', 'Granada', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (1, 'malaga', 'visit to malaga', 'antequera', 'malaga', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (1, 'fiumicino', 'fiumicino', 'Malaga', 'Roma', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (1, 'Piazza di Spagna', 'historic Rome', 'piazza popolo', 'parthenon', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (3, 'granada', 'visit to Alpujarra', 'Granada', 'Lanjaron', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (3, 'malaga', 'visit to Ronda', 'Malaga', 'Ronda', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (1, 'Coloseum', 'a walk in the ancient Rome', 'San Giovannni in Laterano', 'Piazza Venezia', 'no photo', 150);
INSERT INTO track (trip_id, name, description, starting_point, destination_point, photo, distance) values (1, 'Vittorio Emanuele', 'historic Rome', 'piazza popolo', 'Piazza Venezia', 'no photo', 150);


-- to complete..

INSERT INTO trackpoint (track_id, name, lat, lon, description, type, photo) values (4, 'Puerta de Alcala', 7383785, 658273, 'Monument in the city center', 'monument', 'no photo');
