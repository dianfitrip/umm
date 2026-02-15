const User = require("../../models/user.model");
const Role = require("../../models/role.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");


// ================= REGISTER ADMIN =================
exports.registerAdmin = async (req, res) => {

  try {

    const { username, email, password, no_hp } = req.body;

    const existingUser = await User.findOne({ where:{ email }});

    if(existingUser){
      return res.status(400).json({message:"Email sudah ada"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await User.create({
      username,
      email,
      password_hash:hashedPassword,
      id_role:1,
      no_hp:no_hp || null,
      status_user:"aktif"
    });

    res.status(201).json(newUser);

  } catch(error){

    console.log(error);

    res.status(500).json({message:"Server error"});
  }
};


// ================= LOGIN =================
exports.login = async (req,res)=>{

  try{

    const {email,password} = req.body;

    const user = await User.findOne({where:{email}});

    if(!user){
      return res.status(401).json({message:"Login gagal"});
    }

    const match = await bcrypt.compare(password,user.password_hash);

    if(!match){
      return res.status(401).json({message:"Login gagal"});
    }

    // ambil role name dari tabel roles
    const roleData = await Role.findOne({
      where:{id_role:user.id_role}
    });

    const roleName = roleData ? roleData.role_name : null;

    const token = jwt.sign(
      {id:user.id_user, role:roleName},
      env.JWT_SECRET,
      {expiresIn:"1d"}
    );

  res.json({
  token,
  role: roleName, // tambahkan ini
  user:{
    id:user.id_user,
    username:user.username,
    email:user.email,
    role:roleName
  }
});


  }catch(err){

    console.log(err);

    res.status(500).json({message:"Server error"});
  }
};


// DUMMY
exports.register = async (req,res)=>{
  res.json({message:"register user"});
};

exports.me = async (req,res)=>{
  res.json(req.user);
};
