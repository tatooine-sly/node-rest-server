const mongoose = require( 'mongoose' );

const dbConnection = async () => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        } );
        console.log('/*/*/*Conectado a BD/*/*/*')

    } catch ( error ) {
        console.log( error );
        throw new Error( 'Error al iniciar la Base de Datos' );
    }
};


module.exports = {
    dbConnection
};