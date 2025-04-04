CREATE DATABASE IF NOT EXISTS bamboodb;
USE bamboodb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dob DATE,
    class VARCHAR(20),
    role ENUM('user', 'admin') DEFAULT 'user',
    studentID VARCHAR(20),
    cip VARCHAR(20)
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status ENUM('pendente', 'concluído', 'cancelado', 'cancelado pelo usuário') DEFAULT 'pendente',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,     
    text_article TEXT NOT NULL,               
    directory_img VARCHAR(100),     
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    times JSON NOT NULL
);
