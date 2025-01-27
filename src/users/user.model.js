import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligratorio']
    },
    correo: {
        type: String,
        required: [true, 'el Correo es obligratorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligratorio']
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        minLenght: 8,
        maxLenght: 8,
        require: true
    },
    role: {
        type: String,
        required: true,
        anum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function (){
    const {__v, password, _id, ...usuario} = this.toObjects();
    usuario.uid = _id;
    return usuario; 
}

export default mongoose.model('user', UserSchema);