/* var coin= {"call":"head_s"};
    console.log(coin);
        
        $.ajax({url: "http://localhost:3000/flip",
        type:"POST",
        dataType:"json",
        contentType:'application/json',
        data: coin,
        success: function(res){
            console.log(res);
        },
       error: function(err){
           console.log(err);
       }
    }); */
    
    
$(document).ready(function(){
         
$("#heads").on("click",function(event){
    
        $.ajax({
        url:"http://localhost:3000/flip",
        type:"POST",
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify({"call":"head_s"}),
        success: function(response){
            console.log(response.result);
            alert("final : " + response.result);
        },
        error: function(err){
            alert(err);
        }  
      });
       });   
       $("#tails").on("click",function(event){
       $.ajax({
         url:"http://localhost:3000/flip",
        type:"POST",
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify({"call":"tail_s"}),
        success: function(response){
            console.log(response.result);
            alert("final : " + response.result);},
        error: function(err){
            alert(err);
        }  
      });
       });
      
     $("#result1").on("click",function(event){
       $.ajax({
         url:"http://localhost:3000/stats",
        type:"GET",
        dataType:"json",
        contentType:"application/json",
        success: function(response){
             console.log(response.result);
             console.log("wins : " + response.wins + 
             "loss : " + response.losses);},
        error: function(err){
            alert(err);
        }  
      });
      });
      
$("#delete").on("click",function(event){
       $.ajax({
         url:"http://localhost:3000/stats",
        type:"DELETE",
       // dataType:"json",
       // contentType:"application/json",
        success: function(response){
            response.wins=0;
            response.losses=0;
        console.log("wins : " + response.wins + "loss : " + response.losses);
        }  
      });
       });
        
});