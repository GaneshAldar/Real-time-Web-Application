const Menu = require("../../models/menu")

function homeController() {
    return {
        async index(req, res) {
            const pizzas = await Menu.find()
            return res.render('home', { pizzas: pizzas })
            




            // index : function(req,res){
            //     Menu.find().then(function(pizzas){
            //         console.log(pizzas);
            //         return res.render('home', { pizzas: pizzas})
            //     })

        }

        // another way is index(){ }
    }
}

module.exports = homeController