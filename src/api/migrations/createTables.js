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
    DROP TABLE IF EXISTS post_status CASCADE;
    DROP TABLE IF EXISTS posts CASCADE;
    DROP TABLE IF EXISTS posts_x_scopes CASCADE;

    CREATE TABLE content_types (
      content_type_id SERIAL       NOT NULL PRIMARY KEY,
      codename        VARCHAR(100) NOT NULL UNIQUE,
      name            VARCHAR(255)
    );

    CREATE TABLE scopes (
      scope_id   SERIAL       NOT NULL PRIMARY KEY,
      codename   VARCHAR(100) NOT NULL UNIQUE,
      name       VARCHAR(255) NOT NULL UNIQUE,
      is_default BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE users (
      user_id    SERIAL       NOT NULL PRIMARY KEY,
      username   VARCHAR(255) NOT NULL UNIQUE,
      salt       VARCHAR(255) NOT NULL,
      hash       VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name  VARCHAR(255) NOT NULL,
      email      VARCHAR(255) NOT NULL,
      UNIQUE (username)
    );

    CREATE TABLE groups (
      group_id SERIAL       NOT NULL PRIMARY KEY,
      codename VARCHAR(100) NOT NULL UNIQUE,
      name     VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE permissions (
      permission_id   SERIAL NOT NULL PRIMARY KEY,
      scope_id        INTEGER REFERENCES scopes (scope_id) ON DELETE CASCADE,
      group_id        INTEGER REFERENCES groups (group_id) ON DELETE CASCADE,
      content_type_id INTEGER REFERENCES content_types (content_type_id) ON DELETE CASCADE,
      roles           VARCHAR(255)
    );

    CREATE TABLE users_x_groups (
      user_x_group_id SERIAL NOT NULL PRIMARY KEY,
      user_id         INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
      group_id        INTEGER REFERENCES groups (group_id) ON DELETE CASCADE,
      UNIQUE (user_id, group_id)
    );

    CREATE TABLE content_types_x_scopes (
      content_type_x_scope_id SERIAL NOT NULL PRIMARY KEY,
      content_type_id         INTEGER REFERENCES content_types (content_type_id) ON DELETE CASCADE,
      scope_id                INTEGER REFERENCES scopes (scope_id) ON DELETE CASCADE,
      UNIQUE (content_type_id, scope_id)
    );

    CREATE TABLE post_status (
      post_status_id SERIAL       NOT NULL PRIMARY KEY,
      codename        VARCHAR(100) NOT NULL UNIQUE,
      name            VARCHAR(255)
    );

    CREATE TABLE posts (
      post_id  SERIAL       NOT NULL PRIMARY KEY,
      parent_id INTEGER REFERENCES posts (post_id) ON DELETE CASCADE,
      status_id INTEGER REFERENCES post_status (post_status_id) ON DELETE CASCADE,
      author_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
      featured  BOOLEAN,
      title     VARCHAR(255) NOT NULL,
      slug      VARCHAR(255),
      excerpt   VARCHAR(255),
      content   TEXT
    );

    CREATE TABLE posts_x_scopes (
      post_x_scope_id SERIAL NOT NULL PRIMARY KEY,
      post_id         INTEGER REFERENCES posts (post_id) ON DELETE CASCADE,
      scope_id        INTEGER REFERENCES scopes (scope_id) ON DELETE CASCADE,
      UNIQUE (post_id, scope_id)
    );
  `)
}

