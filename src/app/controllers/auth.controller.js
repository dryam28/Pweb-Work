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
    if (!user) throw new Error('This email does not exist');

    if (!(await bcryptjs.compare(password, user.password)))
      throw new Error('Incorrect password');

    req.login(user, function (err) {
      if (err) throw new Error('Error al crear sesión');
      return res.redirect('/');
    });
  } catch (error) {
    return res.json({ msf: error.message })
    req.flash('messages', [{ msg: error.message }]);
    return res.redirect('/auth/login');
  }
}

const logOut = (req, res) => {
  req.logout(function (err) {
    if (err) throw new Error('Error al cerrar sesión');
    return res.redirect('/auth/login');
  });
};

export {
  loginForm,
  loginUser,
  logOut
};
