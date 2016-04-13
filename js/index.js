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
    });
    //扫码加载商品信息
    $("#add-trade").on('click',function(){
        var tradeNum = $("#trade-num").val();
        //console.log(tradeNum);
        //ajax 返回对应条形码的商品信息
        if(tradeNum == "1"){
            addRow();
            showMoney();//更改钱数显示
            serial();//更改序号显示



        }else {
            alert("编码:"+tradeNum+"未找到")
            //console.log("编码:"+tradeNum+"未找到");
        }

    });
    //给扫描条码添加回车事件
    $("#trade-num").keyup(function(){
        if(event.keyCode == 13){
            var tradeNum = $("#trade-num").val();
            //console.log(tradeNum);
            //ajax 返回对应条形码的商品信息
            if(tradeNum == "1"){

                addRow();
                showMoney();//更改钱数显示
                serial();//更改序号显示


            }else {
                if($("#trade-num").val() == ""){
                    alert("请输入或扫描条形码");
                }else {
                    alert("商品条形码:"+tradeNum+"未找到")

                }

                //console.log("编码:"+tradeNum+"未找到");
            }
        }
    });
    //给表格商品添加序号
    function serial(){
        //获取表格序号
        var len = $('table tr').length;
        for(var i = 1;i<len;i++){
            $('table tr:eq('+i+') td:first').text(i);
        }

    }
    //点击移除删除整行

    $("#trade-table").delegate(".remove","click",function(event){
        //console.log(event.target);
        document.querySelector("#trade-table tbody").removeChild(event.target.parentNode);
        serial(); // 重新排序
        //console.log(event.target.parentNode);
    })
    var myCount = 0;
    function addRow () {
        var tradeData = {tradeNum:1,tradeName:"小浣熊1+1",tradePrice:"0.50"};
        myCount ++;
        //console.log(myCount);
        var newRow =
            '<tr id="option'+myCount+'"> <td>1</td> <td>'+tradeData.tradeNum+'</td> <td>'+tradeData.tradeName+'</td> <td class="trade-money">'+tradeData.tradePrice+'</td> <td class="remove" >移除</td> </tr>';

        $("#trade-table").append(newRow);
        $("#trade-num").val("");
        $("#trade-num").focus();


    }
    //修改应付金额显示
    function showMoney() {

        //调取显示金额
        var len = $("tbody td.trade-money").length;
        var money = 0;
        var eMoney = parseFloat($("tbody td.trade-money").text());

        for(var i =0;i<len;i ++){
            money += eMoney;
        }
        money = money.toFixed(2);
        $("#should-money").text("¥"+money+"元");//设置显示格式
        return money;

    }
    //立即支付按键 所有属性.
    //获取所有的商品节点,获取总价格
    $("#mon-pay").on("click",function(){
        var payArr = new Array;
        var len = $('table tr').length - 1 ;
        //alert(len);
        for(var i = 0; i < len;i ++){
            payArr[i] = $('table tr')[1].childNodes[3].innerHTML;
        }

        var tradeMon = showMoney(); // 获取showMoney()函数返回值  是订单总金钱
        payArr['tradeMon'] = tradeMon;
        console.log(payArr);
        //ajax传递订单详情.然后就可以完成订单了.
    });



});
