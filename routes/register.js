const mysql = require("mysql2");

// Connexion MySQL
const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

module.exports = (req, res) => {
    const { username, email } = req.body;

    console.log("Reçu :", username, email);

    if (!username || !email) {
        return res.status(400).send("Champs manquants");
    }

    const sql = "INSERT INTO users (username, email) VALUES (?, ?)";

    db.query(sql, [username, email], (err, result) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).send("Erreur serveur");
        }

        console.log("Utilisateur ajouté !");
        res.send("Inscription réussie !");
    });
};
