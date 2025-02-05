export const tieneRole = (...roles) =>{
    return (req, res, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                 success: false,
                 msg: "se quiere verificar un rol sin verificar el token primero"
            })
        }
        if (!roles.includes(req.usuario.role)){
            return res.status(401).json({
                success: false,
                msg: `usuario mo autorizado ${req.usuario.role}, los roles autorizados son ${roles}`
            })
        }
        next();
    }
}