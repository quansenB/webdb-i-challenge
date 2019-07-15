const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

function getAllAccounts() {
  return db("accounts");
}

function getAccountById(id) {
  return db("accounts").where({ id });
}

function createNewAccount({ name, budget }) {
  return db("accounts").insert({ name, budget });
}

function updateAccountById(id, { name, budget }) {
  return db("accounts")
    .where({ id })
    .update({ name, budget });
}

function deleteAccountById(id) {
  return db("accounts")
    .where({ id })
    .del();
}

server.get("/users", async (req, res) => {
  try {
    const accounts = await getAllAccounts();
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: "No accounts in the database" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

server.get("/users/:id", async (req, res) => {
  try {
    const account = await getAccountById(req.params.id);
    if (account) {
      res.status(200).json(account);
    } else {
      res
        .status(404)
        .json({ message: "No accounts with this ID in the database" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

server.post("/users", async (req, res) => {
  try {
    const name = await createNewAccount({ ...req.body });
    if (name) {
      res
        .status(201)
        .json({ message: "new account has been created", id: number });
    } else {
      res.status(400).json({ message: "Account could not be created" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

server.put("/users/:id", async (req, res) => {
  try {
    const name = await updateAccountById(id, { ...req.body });
    if (name) {
      res
        .status(200)
        .json({ message: "Account has been modified", id: number });
    } else {
      res.status(400).json({ message: "Account could not be modified" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

server.delete("/users/:id", async (req, res) => {
  try {
    const name = await deleteAccountById(req.params.id);
    if (name) {
      res
        .status(200)
        .json({ message: "Account has been deleted successfully" });
    } else {
      res.status(400).json({ message: "Account could not be deleted" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = server;
