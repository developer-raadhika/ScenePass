const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [];

// Test
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ScenePass Backend is working!",
  });
});

// REGISTER
app.post("/api/register", (req, res) => {
  console.log("REGISTER:", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields.",
    });
  }

  const existingUser = users.find(
    (user) => user.email === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already registered.",
    });
  }

  const newUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password,
  };

  users.push(newUser);

  console.log("USER CREATED:", newUser.email);

  return res.status(201).json({
    success: true,
    message: "Account created successfully!",
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
});

// LOGIN
app.post("/api/login", (req, res) => {
  console.log("LOGIN:", req.body);

  const { email, password } = req.body;

  const user = users.find(
    (user) =>
      user.email === email.trim().toLowerCase() &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  return res.json({
    success: true,
    message: "Login successful!",
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

app.listen(PORT, () => {
  console.log(`ScenePass Backend running on http://localhost:${PORT}`);
});