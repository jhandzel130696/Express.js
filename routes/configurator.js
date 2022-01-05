const express=require('express');
const {COOKIE_ADDONS,COOKIE_BASE}=require('../data/cookies-data');
const {getAddonsFromUtils} = require("../utils/getAddonsFromUtils");
const {showErrorPage} = require("../utils/showErrorPage");

const configuratorRouter=express.Router();


//moj sposob na wyciagniecie cen z obiektu

configuratorRouter.get('/select-base/:baseName',(req,res)=>{
    const {baseName}= req.params;

    if(!COOKIE_BASE[baseName]){
        return showErrorPage(res,`There is no base as ${baseName}`)
    }

    res
        .cookie('cookieBase',`${baseName}`)
        .render('configurator/base-selected',{
            baseName,
        });


});

configuratorRouter.get('/select-addons/:selectedAddon',(req,res)=>{
    const {selectedAddon}=req.params;

    if (!COOKIE_ADDONS[selectedAddon]) {

        return res
            .render('error',{
                description:`There is no such addon as ${selectedAddon}`
            })
    }

        const addons = getAddonsFromUtils(req);
    if(addons.includes(selectedAddon)){
        return res
            .render('error',{
                description:` ${selectedAddon} is already on your cookie`
            })
    }


        addons.push(selectedAddon);


        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                selectedAddon,
            });
});

configuratorRouter.get('/remove-addon/:selectedAddon',(req,res)=>{
    const {selectedAddon}=req.params;


    const oldAddons = getAddonsFromUtils(req);

    if(!oldAddons.includes(selectedAddon)){
        return showErrorPage(res,`Cannot delete somethiing that isn't already added ${selectedAddon}`)
    }
    const addons=oldAddons.filter((addon)=>addon !== selectedAddon);



    res
        .cookie('cookieAddons',JSON.stringify(addons) )
        .render('configurator/removed',{
            selectedAddon,
        });
})

module.exports={
    configuratorRouter,
}