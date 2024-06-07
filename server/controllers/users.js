import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import passport from 'passport';
import User from '../models/user.js';

const usersRouter = Router();

// Endpoint per la registrazione di un nuovo utente
usersRouter.post("/signup", async (request, response) => {
  const { username, name, email, password } = request.body;

  try {
    // Verifica se il nome utente esiste già
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: "The username has already been taken" });
    }

    // Verifica se l'email esiste già
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return response.status(400).json({ error: "The email has already been taken" });
    }

    // Hash della password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Creazione del nuovo utente
    const newUser = new User({
      username,
      name,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // Creazione del token JWT
    const payload = {
      id: savedUser._id,
      username: savedUser.username,
      name: savedUser.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return response.status(200).json({ token: `Bearer ${token}` });
  } catch (exception) {
    console.error("Error during signup:", exception);
    return response.status(500).json({ error: "A database error has occurred" });
  }
});

// Endpoint per il login dell'utente
usersRouter.post("/login", async (request, response) => {
  const { usernameOrEmail, password } = request.body;

  try {
    // Verifica se l'utente esiste
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) {
      return response.status(401).json({ error: "Invalid username or password" });
    }

    // Verifica della password
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return response.status(401).json({ error: "Invalid username or password" });
    }

    // Creazione del token JWT
    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return response.status(200).json({ token: `Bearer ${token}` });
  } catch (exception) {
    console.error("Error during login:", exception);
    return response.status(500).json({ error: "A database error has occurred" });
  }
});

// Endpoint per ottenere le informazioni di un utente
usersRouter.get("/:id", passport.authenticate("jwt", { session: false }), async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(user);
  } catch (exception) {
    console.error("Error fetching user:", exception);
    return response.status(500).json({ error: "A database error has occurred" });
  }
});

// Endpoint per salvare un pin
usersRouter.put("/:id/save-pin", passport.authenticate("jwt", { session: false }), async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(
      request.params.id,
      { $addToSet: { savedPins: request.body.photoUrl } },
      { new: true }
    );
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(user);
  } catch (exception) {
    console.error("Error saving pin:", exception);
    return response.status(500).json({ error: "A database error has occurred" });
  }
});

// Endpoint per eliminare un pin
usersRouter.put("/:id/delete-pin", passport.authenticate("jwt", { session: false }), async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(
      request.params.id,
      { $pull: { savedPins: request.body.photoUrl } },
      { new: true }
    );
    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(user);
  } catch (exception) {
    console.error("Error deleting pin:", exception);
    return response.status(500).json({ error: "A database error has occurred" });
  }
});

export default usersRouter;
