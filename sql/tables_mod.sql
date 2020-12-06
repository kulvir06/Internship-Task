create table user(
    name VARCHAR(255),
     email VARCHAR(255) PRIMARY KEY
);

create table cards(
    id varchar(50),
    name varchar(255),
    DESCRIPTION VARCHAR(255),
    assignedUser varchar(255),
    PRIMARY KEY(id, assignedUser),
    FOREIGN KEY (assignedUser) REFERENCES user(email)
);

create table lists (
    id varchar(50),
    name varchar(255),
    cards VARCHAR(50),
    PRIMARY KEY (id,name)
    -- PRIMARY KEY(id, cards),
    -- FOREIGN KEY (cards) REFERENCES cards(id)
);

create table boards(
    id VARCHAR(50),
    name VARCHAR(255) not null ,
    membersOfBoard VARCHAR(255),
    lists varchar(50),
    PRIMARY KEY (id,membersOfBoard,name)
    -- PRIMARY KEY(id, membersOfBoard, lists),
    -- FOREIGN KEY(lists) REFERENCES lists(id)
);



