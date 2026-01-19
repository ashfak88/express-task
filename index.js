const express = require("express")
const app = express()
app.use(express.json())

let users = []

app.post("/users", (req, res) => {
  const { name, email, username } = req.body
  if (!name || !email || !username) {
    return res.status(400).json()
  }

  const newUser = {
    id:users.length + 1,
    name,
    email,
    username
  }

  users.push(newUser)
  res.status(201).json(newUser)
})

app.get("/users", (req, res) => {
  res.json(users)
})

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  if (!user) {
    res.status(404).send();
  }
  res.send(user);
});

app.put("/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id == req.params.id)

  if (userIndex == -1) {
    return res.status(404).json()
  }
  users[userIndex] = {
    ...users[userIndex],
    ...req.body
  }
  res.json(users[userIndex])
})

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  if (!user) {
    res.status(404).send();
  } else {
     users = users.filter((user) => user.id != id);
    res.status(200).send(user);
  }
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000")
})
