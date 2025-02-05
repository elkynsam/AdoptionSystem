import { Router } from "express";
import { check } from "express-validator";
import { SavePet, getPets, searchPet, deletePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jw.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    SavePet
)

router.get('/', getPets)

router.get(
    "/:id",
    [
        validarJWT,
        check("id","no es un id valido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es es un Id valido").isMongoId(),
        validarCampos
    ],
    deletePet
)

export default router;


