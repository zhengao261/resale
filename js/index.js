$(function(){
    //加载实时时间显示
    function current(){
        var d=new Date(),str='';
        str +=d.getFullYear()+'年'; //获取当前年份
        str +=d.getMonth()+1+'月'; //获取当前月份（0——11）
        str +=d.getDate()+'日';
        str +=d.getHours()+'时';
        str +=d.getMinutes()+'分';
        str +=d.getSeconds()+'秒';
        return str; }
        $("#set-time").html(current);
        setInterval(function(){
            $("#set-time").html(current);
        },1000);

    //加载会员信息函数
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
               var data = {name:'郑傲',phone:'15900333581',address:'南区15-401'};
               //var data = "";
               if(data!=""){
                   var returnName = data.name;
                   var returnPhone = data.phone;
                   var returnAddress = data.address;
                   $("#msg-name").val(returnName);
                   $("#msg-phone").val(returnPhone);
                   $("#msg-address").val(returnAddress);
                   $("#msg-accept").val(returnName);
               }else {
                   //data数据是空的时候 要提示会员信息不存在
                   $("#msg-name").val("会员信息不存在");
               }


           }
       })
   })
});
