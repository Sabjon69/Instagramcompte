const db = require("../db/connection");

module.exports = (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).send("Champs manquants");
    }

    const sql = "INSERT INTO users (username, email) VALUES (?, ?)";

    db.query(sql, [username, email], (err, result) => {
        if (err) {
            console.error("Erreur MySQL :", err);
            return res.status(500).send("Erreur serveur");
        }

        console.log("Nouvel utilisateur enregistré :", username, email);
        res.send("Inscription réussie !");
    });
};
