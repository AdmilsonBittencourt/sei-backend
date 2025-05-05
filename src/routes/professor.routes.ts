import { Router } from "express";
import { ProfessorController } from "../controllers/ProfessorController";

const routes = Router();
const controller = new ProfessorController();

routes.post("/", (req, res) => {controller.create(req, res)});
routes.get("/", (req, res) => {controller.findAll(req, res)});
routes.get("/:id", (req, res) => {controller.findById(req, res)});
routes.put("/:id", (req, res) => {controller.update(req, res)});
routes.patch("/:id/desativar", (req, res) => {controller.delete(req, res)});
routes.patch("/:id/reativar", (req, res) => {controller.reactivate(req, res)});

export default routes;
