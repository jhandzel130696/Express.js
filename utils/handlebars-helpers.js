const handlebarsHelpers= {
    'find-price': (entries, selectedItem) => {
        //console.log(entries,selectedItem)
        const found = entries.find(el => el[0] === selectedItem)
        if (!found) {
            throw new Error('podales zle dane')
        }
        const [, price] = found
        return price;
    },

    'pricify': price => price.toFixed(2),

    isNotInArr: (arr, el) => !arr.includes(el),
    isInArr:(arr,el)=>arr.includes(el),
};


module.exports={
    handlebarsHelpers,

}