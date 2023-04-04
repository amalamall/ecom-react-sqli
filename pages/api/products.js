import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), '/data');
    //Read the json data file data.json
    let products = (JSON.parse(await fs.readFile(jsonDirectory + '/products.json', 'utf8'))).products
    if(req.query?.id) {
      products = products.filter( product => String(product.id) === String(req.query.id)) 
      
    }
    if(req.query?.category && req.query?.category !== "All") {
      products = products.filter( product => product.category === req.query.category)
    }
    if(req.query?.search) {
      products = products.filter( product => product.title.toLowerCase().includes(String(req.query.search).toLowerCase()))
    }
    //Return the content of the data file in json format
    return res.status(200).json(products);
  }
  catch (e) {
    return res.status(400).json(e.message);
  }
  
}