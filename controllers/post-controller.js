var {Post}= require('../models/Post');

function fetchData(callback) {
  var userData = Post.find({});
  userData.exec(function (err, data) {
    if (err) throw err;
    return callback(data);
  });
}

const getVideo = (req,res)=>{
  Post("posts",async(db)=>{
    try{
      const video = await db.findOne();
      if(!video){
        console.log("no videos found");
      }
    }catch(err){
     console.log(err);   
    }
  })
}

module.exports={
 
    // fetchData:function(req, res){
      
    //   fetchModel.fetchData(function(data){
    //       res.render('livestream',{userData:data});
    //   })
    // }
    getVideo
}