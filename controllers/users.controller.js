const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log("Datos recibidos:", req.body);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Usuario ya existe:", existingUser);
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña encriptada:", hashedPassword);

        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();
        console.log("Usuario guardado:", newUser);

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(
            {
                message: 'Usuarios obtenidos con éxito',
                data: users
            }
        );
    } catch (error) {
        return res.status(500).json(
            {
                message: 'Error al consultar usuarios',
                data: error
            }
        );
    }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // ✅ Usa la clave desde .env
    const token = jwt.sign(
      { userId: user._id, userName: user.userName },
      process.env.JWT_SECRET, // 👍 se toma desde .env
      { expiresIn: '8h' }
    );

    const formatUser = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };

    return res.status(200).json({
      user: formatUser,
      token: token,
      message: 'Inicio de sesión exitoso',
    });

  } catch (error) {
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

/*
exports.loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        await User.findOne({ userName })
            .then(async user => {
                if (!user) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                // Compara la contraseña ingresada con la almacenada en la base de datos
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                // Formato de usuario para la respuesta
                let formatUser = {
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                };

                return res.status(200).json({
                    user: formatUser,
                    message: 'Inicio de sesión exitoso',
                });
            }).catch(err => {
                return res.status(500).json({
                    action: 'login',
                    error: err.message || 'Error inesperado'
                });
            });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};*/
