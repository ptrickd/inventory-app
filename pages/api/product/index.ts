// //Database
// import dbConnect from '../../../utils/dbConnect'

// //Type
// import type { NextApiRequest, NextApiResponse } from 'next'

// //Models
// import { Product } from '../../../models/product.model'

// //Controller
// import { createProduct, getProducts } from '../../../controllers/product.controller'

// dbConnect()



// export default async (req: NextApiRequest, res: NextApiResponse) => {

//     try {
//         //Create Product
//         if (req.method === "POST") {
//             await createProduct(req, res)
//         } else if (req.method === "GET") {//Get all Products
//             await getProducts(req, res)
//         }
//     } catch (err) {
//         return res.status(500).json({ message: 'Server Error' })
//     }

//     // return res.status(500).json({ message: 'Error Server' })

// }

