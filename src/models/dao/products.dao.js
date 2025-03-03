import { Common } from "./common.dao.js"

export class ProductsDao extends Common {

    async getByid(pid){
        try{
        const result = await this.model.findOne({ pid })
        return result
        } catch(e){
            return null
        }
    }

    async getProdsQuery(queryParams){
    
        let {limit,page,sort,query} = queryParams
        let oSort ={}
        let oQuery ={}

        if (!limit) limit ="10"
        if (!page) page = "1"
        if (sort=="asc") oSort.price = 1
        if (sort=="desc") oSort.price = -1
              
        if ( query && query.includes("category=")) oQuery.category= query.split("=")[1]
        if ( query && query.includes("stock")) oQuery.stock=  {$gt: 0}
   
     
        try{
         //const result = await this.model.paginate({},{limit:1 ,page:1,sort:{}});
           const result = await this.model.paginate(oQuery,{limit:limit ,page:page,sort:oSort});
         
            return result
        } catch(e){
            return null
        }
    }



   
   


}