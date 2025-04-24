import { Contact } from "../models/contact.model.js";

export const sendMessage = async(req,res)=>{
    try {
        const {username, email, message} = req.body
        await Contact.create({username, email, message})
        res.status(200).json({message: "Message send succefully"})
    } catch (error) {
        console.log(error)
    }
}

export const getAllMessages = async(req, res)=>{
    try {
        const contacts = await Contact.find()
        res.status(200).json(contacts)
    } catch (error) {
        console.log(error)
    }
}

export const deleteMessage = async(req, res)=>{
    try {
        const {id} = req.params
        const remove = await Contact.findByIdAndDelete(id)
        if(!remove){
            return res.status(400).json({message: "Failed to delete."})
        }
        res.status(200).json({message: "Message removed successfully."})
    } catch (error) {
        console.log(error)
    }
}