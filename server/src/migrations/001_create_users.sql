CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    user_name TEXT NOT NULL UNIQUE CHECK (
        length(user_name) >= 3
        AND length(user_name) <= 20
        AND user_name GLOB '[a-zA-Z0-9_]*'
    ),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL CHECK (
        length(password) >= 8
        AND password GLOB '*[A-Z]*'
        AND password GLOB '*[a-z]*'
        AND password GLOB '*[0-9]*'
        AND password GLOB '*[^A-Za-z0-9]*'
    ),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
