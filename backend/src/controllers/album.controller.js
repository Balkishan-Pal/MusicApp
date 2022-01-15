const express = require("express")

const router = express.Router()

const Albums = require("../models/albumModels")

router.post("", async(req,res)=>{
    const album = await Albums.create(req.body)

    return res.status(201).send({album})
})



router.get("/",async(req,res)=>{
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;

    const offset = (page - 1) * size;


    const album = await Albums.find().skip(offset).limit(size).lean().exec()

    const totalCount = await Albums.find().countDocuments().lean().exec()

    const totalPages = Math.ceil(totalCount/size)

    return res.status(200).json({data: {album, totalPages}})
})

router.get("/all",async(req,res)=>{
    const album = await Albums.find().lean().exec()
    res.send(album)
})

router.patch("/:id",async(req,res)=>{
    const album = await Albums.findByIdAndUpdate(req.params.id,req.body,{new:true})

    return res.status(201).send({album})
})

router.get("/:id", async(req,res)=>{
    const songs = await Albums.findById(req.params.id)

    return res.status(200).json({data:{songs}})
})

module.exports = router