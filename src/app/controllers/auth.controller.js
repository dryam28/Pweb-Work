import bcryptjs from "bcryptjs";
import User_Model from "../models/User_Model.js";
import { validationResult } from "express-validator";

const loginForm = (req, res) => res.render('pages/Login', { layout: false, messages: req.flash().messages });

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("messages", errors.array());
    return res.redirect("/auth/login");
  }

  const { email, password } = req.body;

  try {
    const user = await User_Model.findOne({ where: { email } });
    if (!user) throw new Error('Este correo no existe');

    if (!(await bcryptjs.compare(password, user.password)))
      throw new Error('Contraseña incorrecta');

    req.login(user, function (err) {
      if (err) throw new Error('Error al crear sesión');
      return res.redirect('/');
    });
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/');
  }
}

const logOut = (req, res) => {
  req.logout(function (err) {
    if (err) throw new Error('Error al cerrar sesión');
    return res.redirect('/auth/login');
  });
};

const getProfile = (req, res) => res.render('pages/Profile', { layout: false, user: req.user, messages: req.flash().messages });

const saveProfileChanges = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("messages", errors.array());
    return res.redirect("/auth/Profile");
  }

  const { name, email, password, confirmPassword, currentPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User_Model.findOne({ where: { id: userId } });
    if (!user) throw new Error('Usuario no encontrado');

    if (currentPassword && !(await bcryptjs.compare(currentPassword, user.password)))
      throw new Error('Contraseña actual incorrecta');

    if (password && confirmPassword && password !== confirmPassword)
      throw new Error('Las contraseñas no coinciden');

    const updatedUser = {
      name,
      email,
      password: password ? await bcryptjs.hash(password, 10) : user.password
    };

    await User_Model.update(updatedUser, { where: { id: userId } });

    req.flash('messages', [{ msg: 'Los cambios han sido guardados correctamente' }]);
    return res.redirect('/auth/Profile');
  } catch (error) {
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/auth/Profile');
  }
};

export {
  loginForm,
  loginUser,
  logOut,
  getProfile,
  saveProfileChanges
};
