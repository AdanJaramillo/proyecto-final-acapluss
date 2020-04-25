//PUERTO
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//Conexion a la base de datios 
let urlDB; 

if(process.env.NODE_ENV === 'dev'){  
    urlDB= 'mongodb://localhost:27017/desarrollo';
}else { 
    urlDB= 'mongodb+srv://maximo:maximo@cluster0-3jpfo.mongodb.net/test?retryWrites=true&w=majority';
}



//env = entorno  
process.env.URLDB = urlDB;

//Firma de JWt 
process.env.SEED = process.env.SEED || 'Frima-super-secreta';

process.env.CADUCIDAD_TOKEN = process.env.CADUCIDAD_TOKEN || '5h';