DROP TABLE IF EXISTS content_types;
DROP TABLE IF EXISTS scopes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS users_x_groups;
DROP TABLE IF EXISTS content_types_x_scopes;
DROP TABLE IF EXISTS posts_status;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS posts_x_scopes;

CREATE TABLE content_types
(
    id       INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
    codename VARCHAR(100) NOT NULL UNIQUE,
    name     VARCHAR(255)
);

CREATE TABLE scopes
(
    id       INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
    codename VARCHAR(100) NOT NULL UNIQUE,
    name     VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE users
(
    id        INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
    uuid      VARCHAR(255) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL
);

CREATE TABLE groups
(
    id   INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE permissions
(
    id            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    scopeId       INTEGER REFERENCES scopes (id) ON DELETE CASCADE,
    groupId       INTEGER REFERENCES groups (id) ON DELETE CASCADE,
    contentTypeId INTEGER REFERENCES content_types (id) ON DELETE CASCADE,
    roles         VARCHAR(255)
);

CREATE TABLE users_x_groups
(
    id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    userId  INTEGER REFERENCES users (id) ON DELETE CASCADE,
    groupId INTEGER REFERENCES groups (id) ON DELETE CASCADE
);

CREATE TABLE content_types_x_scopes
(
    id            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    contentTypeId INTEGER REFERENCES content_types (id) ON DELETE CASCADE,
    scopeId       INTEGER REFERENCES scopes (id) ON DELETE CASCADE
);

CREATE TABLE posts_status
(
    id       INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
    codename VARCHAR(100) NOT NULL UNIQUE,
    name     VARCHAR(255)
);

CREATE TABLE posts
(
    id       INTEGER      NOT NULL PRIMARY KEY AUTOINCREMENT,
    parentId INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    statusId INTEGER REFERENCES posts_status (id) ON DELETE CASCADE,
    authorId INTEGER REFERENCES users (id) ON DELETE CASCADE,
    featured BOOLEAN,
    title    VARCHAR(255) NOT NULL,
    slug     VARCHAR(255),
    excerpt  VARCHAR(255),
    content  TEXT
);

CREATE TABLE posts_x_scopes
(
    id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    postId  INTEGER REFERENCES posts (id) ON DELETE CASCADE,
    scopeId INTEGER REFERENCES scopes (id) ON DELETE CASCADE
);
