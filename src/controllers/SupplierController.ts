import express, {request} from 'express';
import { SupplierModel } from '../models/Supplier';

class SupplierController {

    getAllSupplier = async (request: express.Request, response: express.Response) => {
        try{
            const suppliers = await SupplierModel.find();
            return response.status(200).json({data: suppliers})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    getSupplier = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const supplier = await SupplierModel.findById(id);
            return response.status(200).json({data: supplier})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    createSupplier = async (request: express.Request, response: express.Response) => {
        console.log(`Incomming request: ${request}`);
        try{
            const {supplierName, companyName, address, email, contact } = request.body;
            const supplier = new SupplierModel({
                supplierName,
                companyName,
                address,
                email,
                contact
            });
            await supplier.save();
            return response.status(201).json({message: "Supplier Created", data: supplier})
        } catch (error) {
            console.log(`Error: ${error}`);
            return response.sendStatus(400);
        }
    }

    updateSupplier = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const {supplierName, companyName, address, email, contact } = request.body;

            const supplier = await SupplierModel.findById(id);
            if(supplier){
                supplier.supplierName = supplierName;
                supplier.companyName = companyName;
                supplier.address = address;
                supplier.email = email;
                supplier.contact = contact;

                await supplier.save();
                return response.status(200).json({message: "Supplier updated", data: supplier})
            }
            return response.sendStatus(400);
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    deleteSupplier = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            await SupplierModel.findByIdAndDelete({_id: id});
            return response.status(200).json({message: "Supplier Deleted"})
        } catch (error) {
            return response.sendStatus(400);
        }
    }
}

export default new SupplierController();