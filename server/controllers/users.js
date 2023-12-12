  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  // Load User model
  const User = require("../models/user");
  // Load input validation
  const SignupValidation = require("../validator/SignupValidation");
  const SigninValidation = require("../validator/SigninValidation");

  module.exports = {
    signup: async (req, res) => {
      const { firstName, lastName, code, email, password, phoneNumber, role } = req.body; // Include 'role' here
      const { errors, isValid } = SignupValidation(req.body);

      try {
        if (!isValid) {
          return res.status(404).json(errors);
        } else {
          const exist = await User.findOne({ email });
          if (exist) {
            errors.email = "Email already in use";
            return res.status(404).json({ message: "Email is already in use", errors });
          } else {
            const hashedpassword = bcrypt.hashSync(password, 8);
            const result = await User.create({
              password: hashedpassword,
              firstName,
              lastName,
              code,
              email,
              phoneNumber,
              role, // Include 'role' in user creation
            });
            return res.status(201).json({ message: "Account Created" });
          }
        }
      } catch (error) {
        console.log("cont",error.message);
        return res.status(500).json({ message: 'Server Error' });
      }
    },

    signin: async (req, res) => {
      const { email, password } = req.body;
      const { errors, isValid } = SigninValidation(req.body);

      try {
        if (!isValid) {
          return res.status(404).json(errors);
        }

        const user = await User.findOne({ email });

        if (!user) {
          errors.email = "Email does not exist! Please enter the correct Email or create an account";
          return res.status(404).json(errors);
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
          errors.password = "Wrong Password";
          return res.status(404).json({ message: 'Password not matched', errors });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, "sooraj_DOING_GOOD", {
          expiresIn: "8h",
        });

        const options = {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          httpOnly: true,
          sameSite: "lax",
        };

        const data = {
          id: user._id
        };

        return res.status(201).json({
          token,
          role: user.role,
          userID: user._id,
          message: 'Logged In Successfully'
        });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' });
      }
    },

    verifyToken: async (req, res) => {
      try {
        const token = req.body.token;
        if (!token) {
          return res.status(401).json({
            message: 'No token provided',
          });
        }
        const decoded = jwt.verify(token, "sooraj_DOING_GOOD");
        return res.status(200).json(decoded);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
            message: 'Token expired',
          });
        }
        return res.status(401).json({
          message: 'Invalid token',
        });
      }
    },
    getUser: async (req, res) => {
      const id = req.params.id;
      try {
        const userdata = await User.findById(id);
        const data = {
          firstName: userdata.firstName,
          LastName: userdata.lastName,
          email: userdata.email,
        }
        return res.status(200).json(data);
      } catch (error) {
        return res.status(401).json({
          message: 'Get Req Failed'
        });
      }
    }
  }
