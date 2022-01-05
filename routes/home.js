const express=require('express');
const {getCookieSettings} = require("../utils/get-cookie-settings");
const homeRouter=express.Router();

homeRouter
    .get('/', (req,res)=>{
        const {sum,allAddons,allBases,base,addons}=getCookieSettings(req);

        res.render('home/home',{
            cookie:{
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        })

    })

module.exports={
    homeRouter,
}