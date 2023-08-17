// module for crud operations

    import express from 'express';
    import Product from './model.js';

        
    const router=express.Router();
    //routes

    router.get('/transactions', async(req, res) => {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    router.get('/transactions/:id', async(req, res) =>{
        try {
            const {id} = req.params;
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })



    // insert a new transaction
    router.post('/transactions/insert',async (req, res) => {
        try {
            // Create a new document using the model
            const newData = new Product({
                Date: req.body.Date,
                Description: req.body.Description,
                Amount: req.body.Amount,
                Currency: req.body.Currency
            });
            const insertedData = await newData.save();

            res.status(201).json({ message: 'Data inserted successfully', data: insertedData });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ message: 'An error occurred' });
        }
    });

    // edit a transaction
    router.patch('/transactions/:id', async(req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate(id,
                req.body,
                { new: true } );
            // we cannot find any product in database
            if(!product){
                return res.status(404).json({message: `cannot find any product with ID ${id}`})
            }
            else{
                return res.send(product);
            }
            //const updatedProduct = await Product.findById(id);
            res.status(200);
            //res.status(200).json(updatedProduct);
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    // delete a transaction

    router.get('/transactions/delete/:id', async(req, res) =>{
        try {
            const {id} = req.params;
            const product = await Product.deleteOne({ _id: req.params.id });
            if(!product){
                return res.status(404).json({message: `cannot find any product with ID ${id}`})
            }
            res.status(200).json(product);
            //res.send(`Successfully deleted transaction with id ${id}`);
            
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })

    
    
    export {router};
