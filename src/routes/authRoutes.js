// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const crypto = require('crypto');
const path = require('path');
const session = require('express-session');

const db = new sqlite3.Database(path.join(__dirname, '../db/db.sqlite'), (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/pages/signup.html"));
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password,telephone } = req.body;
    const user = await getUserByUsername(username);
    if (user) {
      return res.status(409).send("Username already exists.");
    }
    const hashedPassword = hashPassword(password);
    db.run("INSERT INTO users (username, password,telephone) VALUES (?, ?, ?)", [username, hashedPassword,telephone], function(err) {
      if (err) {
        return res.status(500).send("Error registering new user.");
      }
      res.redirect("/home");
    });
  } catch (err) {
    res.status(500).send("Server error.");
  }
});

router.get("/home", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/store");
  } else {
    res.sendFile(path.join(__dirname, "../../client/pages/home.html"));
  }
});

router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/store');
  } else {
    res.sendFile(path.join(__dirname, "../../client/pages/home.html"));
  }
});

router.post("/home", async (req, res) => {
    try {
      
      const { username, password, telephone } = req.body;
      const user = await getUserByUsername(username);
      if (!user || user.password !== hashPassword(password)) {
        return res.status(401).send("Invalid credentials.");
      }

      
      req.session.loggedIn = true;
      req.session.username = user.username;
      req.session.telephone = user.phone;
      
      const userBagItems = await getUserBagItems(user.username);
      req.session.bagItems = userBagItems;
  
      res.cookie('user', user.username, { httpOnly: true, maxAge: 3600000 });
      res.cookie('telephone',user.telephone, {httpOnly: true, maxAge: 3600000})
      res.redirect("/store");
    } catch (err) {
      res.status(500).send("Server error.");
    }
  });
  

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('user');
    res.redirect("/home");
  });
});

router.post("/addItemToBag", async (req, res) => {
  const item = req.body.item;
  if (!req.session.bagItems) {
    req.session.bagItems = [];
  }
  req.session.bagItems.push(item);

  await saveUserBagItems(req.session.username, req.session.bagItems);
  res.status(200).send("Item added to bag");
});

router.get("/getBagItems", (req, res) => {
  res.status(200).json(req.session.bagItems || []);
});

const saveUserBagItems = (username, bagItems) => {
  return new Promise((resolve, reject) => {
    db.run("UPDATE users SET bagItems = ? WHERE username = ?", [bagItems.join(','), username], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const getUserBagItems = (username) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT bagItems FROM users WHERE username = ?", [username], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row && row.bagItems ? row.bagItems.split(',') : []);
        }
      });
    });
  };
  

module.exports = router;
