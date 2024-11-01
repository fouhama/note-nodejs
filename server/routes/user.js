import express from "express";
import { register, login } from "../controller/user.js";

const Route = express.Router();

Route.route("/register").post(register);
Route.route("/login").post(login);

export default Route;
