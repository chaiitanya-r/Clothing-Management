const db = require('../config/db');

class Clothing {
    static createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS clothing_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                size VARCHAR(50),
                color VARCHAR(50),
                image_url VARCHAR(255),
                stock_quantity INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static dropTable() {
        return new Promise((resolve, reject) => {
            db.query('DROP TABLE IF EXISTS clothing_items', (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = Clothing;
