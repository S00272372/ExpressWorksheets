import express, {Application, Request, Response} from "express" ; 
const PORT = process.env.PORT || 5252; 
const app: Application = express(); 

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