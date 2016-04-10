$(function(){
   $("#getVip").on('click',function(){
       var vipNum = $("#vipNum").val();

       $.ajax({
           type:"POST",
           url:"server/server.php",
           dataType:"json",
           data:{
               vipNum : vipNum
           },
           success:function(data){
               if(data.success){


               }else{
                   $("#searchResult").html("出现错误："+data.msg)
               }
           },
           error:function(jqXHR){
               //alert("发生错误："+jqXHR.status);
               var data = {name:'zhangsan',phone:'15900333581',address:'南区15-401'};
               var returnName = data.name;
               var returnPhone = data.phone;
               var returnAddress = data.address;

               $("#msg-name").val(returnName);
               $("#msg-phone").val(returnPhone);
               $("#msg-address").val(returnAddress);






           }
       })
   })
});
