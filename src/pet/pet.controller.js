import User from '../users/user.model.js';
import Pet from './pet.model.js';

export const SavePet = async (req, res) => {
    try {
        
        const data = req.body;
        const user = await User.findOne({ email: data.email});

        if(!user){
            res.status(404).json({
                success: false,
                message: 'Propietario no encontrado',
                error
            })  
        }

        const pet = new Pet({
            ...data,
            keeper: user._id
        });

        await pet.save();

        res.status(200).json({
            success: true,
            pet
        })  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al generar mascota',
            error
        })
    }
}

export const getPets = async (req, res) =>{
    const { limite = 10, desde = 0} = req.query;
    const query = { status: true}; 

    try {
        const pets = await Pet.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

            const petWithOwnerNames = await Promise.all(pets.map(async (pety) =>{
                const owner = await User.findById(pet.keeper);
                return {
                    ...pet.toObject(),
                    keeper: owner ? owner.nombre : "propietario no encontrado"
                }
            }));

            const total = await Pet.countDocuments(query);

            res.status(200).json({
                success: true,
                total,
                pets: petWithOwnerNames
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener mascota",
            error
        })
    }
}

export const searchPet = async (req, res) =>{
    const { id } = req.params;
    try {
        const pet = await Pet.findById(id);

        if(!pet){
            return res.status(404).json({
                success: false,
                message: "Mascota no encontrada"
            })
        }
        const owner = await User.findById(pet.keeper);

        res.status(200).json({
            success: true,
            pet: {
                ...pet.toObject(),
                keeper: owner ? owner.nombre : "propietario no encontrado"
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar mascota',
            error
        })
    }
}

export const deletePet = async (req, res) =>{
    const { id } = req.params;

    try {
        await Pet.findByIdAndUpdate(id, {status: false});

        res.status(200).json({
            success: true,
            message: "pet Eliminada exitosamente"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la mascota",
            error
        })
    }
}