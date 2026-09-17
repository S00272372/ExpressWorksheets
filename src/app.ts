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
