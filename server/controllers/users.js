import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import passport from 'passport';
import User from '../models/user.js';

const usersRouter = Router();

usersRouter.post("/signup", async (request, response) => {
  const { username, name, email, password } = request.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: "The username has already been taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return response.status(400).json({ error: "The email has already been taken" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      name,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

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

usersRouter.post("/login", async (request, response) => {
  const { usernameOrEmail, password } = request.body;

  try {
    const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!user) {
      return response.status(401).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return response.status(401).json({ error: "Invalid username or password" });
    }

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
