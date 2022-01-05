const {getAddonsFromUtils} = require("./getAddonsFromUtils");
const {COOKIE_BASE, COOKIE_ADDONS} = require("../data/cookies-data");
const {handlebarsHelpers} = require("./handlebars-helpers");

function getCookieSettings(req){

    const {cookieBase:base}= req.cookies;
    const addons = getAddonsFromUtils(req);
    const allBases =Object.entries(COOKIE_BASE);
     const allAddons= Object.entries(COOKIE_ADDONS);
    const sum =(base ?handlebarsHelpers['find-price'](allBases,base):0)
        +addons.reduce((a,b)=>{

            return a + handlebarsHelpers['find-price'](allAddons,b);
        },0)

    return {
        addons,
        base,
        sum,
        allBases,
        allAddons,
    }

};

module.exports={
    getCookieSettings,
}