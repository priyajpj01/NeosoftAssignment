const { ROLE } = require('./data')
// Load User model
const User = require("./models/user")

var arrOptions=[]
function registerOptions(role) {
    if (role === ROLE.ADMIN) 
    {
        arrOptions.push(ROLE.PM)
        arrOptions.push(ROLE.IM)
        arrOptions.push(ROLE.Client)
        return arrOptions
    }
    if(role===ROLE.PM)
    {
        arrOptions.push(ROLE.IM)
        arrOptions.push(ROLE.Client)
        return arrOptions
    }
    if(role===ROLE.IM)
    {
        return "Don't have registeration accesss"
    }
   
}


function canRegisterUser(role) {
    return (
        role === ROLE.PM || role===ROLE.ADMIN
      )
}

function canCreateOrder(role) {
    return (
      role === ROLE.PM
    )
  }
  
function canUpdateOrder(role)
{
    return (
        role === ROLE.PM || role===ROLE.ADMIN || role===ROLE.IM
      )

}  

function viewStatus(role)
{
    return (
        role === ROLE.PM || role===ROLE.ADMIN || role===ROLE.IM || role===ROLE.Client      )

}  

async function scopedUser(role) {
    var filter
    console.log(role)
    if (role === ROLE.ADMIN) 
        filter={}
    else
    {
        filter={}
        filter.owner=role 
    }
         
   try {
        const users = await User.findOne({userID:"12222@gmail.com"})
        if (!users) {
            return res.status(404).send()
        }
        console.log(users)
        return users
    } catch (e) {
  }
}

module.exports = {
  canRegisterUser,
  registerOptions,
  scopedUser,
  canCreateOrder,
  canUpdateOrder,
  viewStatus
  
}