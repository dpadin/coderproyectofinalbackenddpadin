import { Common } from "./common.dao.js"
 

export class CartsDao extends Common {

    async delFromCart (cid, pid){
        try{
         
            const cart =  this.model.findByIdAndUpdate(
                cid,
                { $pull: { products: { product: pid } } },
                { new: true }  
            );
            
            if (!cart) {
                return ("Cart o product no encontrado");
            } else {
                return cart
            }
         
        } catch(e){
            console.log (e)
            return null
        }
    }
    
    async deleteProducts (cid){
        try{
            const result = await this.model.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
    
            return result
        } catch(e){
            return e
        }
    }

    async addToCart(cartId, productId, quantity = 1) {
        const cart = await this.model.findById(cartId);

        if (!cart) throw new Error("Cart not found");
         

        const existingProduct = cart.products.find(p => p.product.toString() === productId);
        
        console.log (existingProduct)


        if (existingProduct) {
            existingProduct.quantity = quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
    
        await cart.save();
        return cart;
    }
    
    async getByCart(cid){
        //modificar para populate
   
        try{

           const result = await this.model.findById(cid).populate("products.product");
          console.log ("populate se ve asi: ")
           console.log(result);
           return result
        } catch(e){
            console.log (e)
            return e
        }
    }
}