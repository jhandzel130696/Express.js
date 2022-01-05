const express=require('express');
const {getCookieSettings} = require("../utils/get-cookie-settings");


const orderRouter=express.Router();

orderRouter.get('/summary',(req,res)=>{
    const {sum,allAddons,allBases,base,addons}=getCookieSettings(req);

    res.render('order/summary',{
        cookie:{
            base,
            addons,
        },
        allBases,
        allAddons,
        sum,
    })

})

orderRouter.get('/thanks',(req,res)=>{
   const {sum}=getCookieSettings(req);

    res
        .clearCookie('cookieBase')
        .clearCookie('cookieAddons')
        .render('order/thanks',{
        sum
    })
})

module.exports={
    orderRouter,
}