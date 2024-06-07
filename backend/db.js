const mongoose = require('mongoose');

// mongoURI = 'mongodb://manasdivekar76:mCYZJSwCP2qBRnbw@ac-gpne0ne-shard-00-00.coeqsfq.mongodb.net:27017,ac-gpne0ne-shard-00-01.coeqsfq.mongodb.net:27017,ac-gpne0ne-shard-00-02.coeqsfq.mongodb.net:27017/flavorRover?ssl=true&replicaSet=atlas-sz8ks9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
mongoURI = 'mongodb+srv://manasdivekar76:mCYZJSwCP2qBRnbw@cluster0.coeqsfq.mongodb.net/flavorRover'

const mongoDb = async() => {
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,res)=>{
        
        if(err) {console.log("---",err);}
        else{
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (error,categories){
                    if (err) console.log(err);
                else {
                    global.food_items = data;
                    global.food_category = categories;
                   
                }
                })

            })
    }
});
}




module.exports = mongoDb;
