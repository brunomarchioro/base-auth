import { sql } from "slonik"
import db from "api/connectors/pgsql"

export default async () => {
  await db.query(sql`
    DROP TABLE IF EXISTS content_types CASCADE;
    DROP TABLE IF EXISTS scopes CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS groups CASCADE;
    DROP TABLE IF EXISTS permissions CASCADE;
    DROP TABLE IF EXISTS users_x_groups CASCADE;
    DROP TABLE IF EXISTS content_types_x_scopes CASCADE;
    DROP TABLE IF EXISTS posts_status CASCADE;
    DROP TABLE IF EXISTS posts CASCADE;
    DROP TABLE IF EXISTS posts_x_scopes CASCADE;

    CREATE TABLE content_types (
      id       SERIAL       NOT NULL PRIMARY KEY,
      codename VARCHAR(100) NOT NULL UNIQUE,
      name     VARCHAR(255)
    );

    CREATE TABLE scopes (
      id         SERIAL       NOT NULL PRIMARY KEY,
      codename   VARCHAR(100) NOT NULL UNIQUE,
      name       VARCHAR(255) NOT NULL UNIQUE,
      is_default BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE users (
      id         SERIAL       NOT NULL PRIMARY KEY,
      username   VARCHAR(255) NOT NULL UNIQUE,
      salt       VARCHAR(255) NOT NULL,
      hash       VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name  VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL
    );

    CREATE TABLE groups (
      id       SERIAL       NOT NULL PRIMARY KEY,
      codename VARCHAR(100) NOT NULL UNIQUE,
      name     VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE permissions (
      id              SERIAL NOT NULL PRIMARY KEY,
      scope_id        INTEGER REFERENCES scopes (id) ON DELETE CASCADE,
      group_id        INTEGER REFERENCES groups (id) ON DELETE CASCADE,
      content_type_id INTEGER REFERENCES content_types (id) ON DELETE CASCADE,
      roles           VARCHAR(255)
    );

    CREATE TABLE users_x_groups (
      id       SERIAL NOT NULL PRIMARY KEY,
      user_id  INTEGER REFERENCES users (id) ON DELETE CASCADE,
      group_id INTEGER REFERENCES groups (id) ON DELETE CASCADE
    );

    CREATE TABLE content_types_x_scopes (
      id              SERIAL NOT NULL PRIMARY KEY,
      content_type_id INTEGER REFERENCES content_types (id) ON DELETE CASCADE,
      scopeid         INTEGER REFERENCES scopes (id) ON DELETE CASCADE
    );

    CREATE TABLE posts_status (
      id       SERIAL       NOT NULL PRIMARY KEY,
      codename VARCHAR(100) NOT NULL UNIQUE,
      name     VARCHAR(255)
    );

    CREATE TABLE posts (
      id        SERIAL       NOT NULL PRIMARY KEY,
      parent_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
      status_id INTEGER REFERENCES posts_status (id) ON DELETE CASCADE,
      author_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
      featured  BOOLEAN,
      title     VARCHAR(255) NOT NULL,
      slug      VARCHAR(255),
      excerpt   VARCHAR(255),
      content   TEXT
    );

    CREATE TABLE posts_x_scopes (
      id       SERIAL NOT NULL PRIMARY KEY,
      post_id  INTEGER REFERENCES posts (id) ON DELETE CASCADE,
      scope_id INTEGER REFERENCES scopes (id) ON DELETE CASCADE
    );
  `)
}

