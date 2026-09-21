import express, { Application, Request, Response } from 'express';
import carRoutes from './routes/cars'
import { env } from "./config/env"; 
import { connectDB } from './config/database';
const PORT = env.port; 
const app: Application = express(); 

app.use('/api/v1/cars', carRoutes);
app.use(express.json());  

app.get("/ping", async (_req : Request, res: Response) => { 

 res.json({ 

 message: "S00272372 Artem Domashenko"

 }); 

}); 

app.listen(PORT, () => { 

 console.log("Server is running on port", PORT); 

 }); 
 
 app.get('/bananas', async (_req : Request, res: Response) => { 

 res.json({ 

 message: "this is bananas", 

  }); 
  

}); 
 app.get('/cars', async (_req : Request, res: Response) => { 

 res.json({             

message: "this is cars",  

  }); 
  

}); 
app.use((req, _res, next) => { 

 console.log(`${req.method} ${req.originalUrl}`); 

 next(); 

}); 
const startServer = async () => { 

 await connectDB(); 

 

 app.listen(PORT, () => { 

 console.log(`Server running on port ${PORT}`); 

 }); 

 

};
startServer(); 