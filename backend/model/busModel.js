import mongoose from "mongoose"
import bcrypt from "bcrypt"



const busSchema=new mongoose.Schema({
    busNumber:{
        type:String,
        unique:[true,"Bus Number Already Registered Try Other Number"]
    },
    busNumberPlate:{
        type:String,
        unique:[true,"Bus Number Plate Already Registered"]
    },
    driver:{
        name:{
            type:String,
        },
        contactInfo:{
            type:String,
        },
        password:{
            type:String,
            unique:[true,"Password Already Taken"],
            minlength:[6,"Password Should Contain Atleast 6 Characters"]
        }
    },
    avgRating:{
        type:Number,
        default:0
    },
    route: {
        ref: "Route",
        type: mongoose.Schema.Types.ObjectId
    },
    busStatus:{
        type:String,
        enum:["active","notactive"],
        default:"notactive"
    },
    photo:{
        secure_url:String,
        photo_id:String
    },
    seats:{
        total:{
            type:Number,
            default:40
        },
        occupied:{
            type:[Number],
            default:[]
        },
        layout:{
            type:String,
            enum:["2+2", "3+2"],
            default:"2+2"
        }
    },
    currentLocation:{
        lat:{
            type:Number,
            default:0
        },
        lng:{
            type:Number,
            default:0
        },
        lastUpdated:{
            type:Date,
            default:Date.now
        }
    }
},{timestamps:true})

busSchema.methods.validatePassword=async function (gotPassword){
    try
    {
        return await bcrypt.compare(gotPassword,this.driver.password)
    }
    catch(error)
    {
        console.log("error in validating password")
    }
}


busSchema.pre("save",async function (next){
    if(!this.isModified("driver.password"))
        return next();
    this.driver.password=await bcrypt.hash(this.driver.password,8);
})

export const BUS=mongoose.model("Bus",busSchema)