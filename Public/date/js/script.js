$(document).ready(function(){
	var info = {
        header: {
            left: 'prev,next,today',
            center: 'title',
            right: 'month'
        },
        buttonText:{
            today:'跳转到当天'
        },
        editable: true,
        events: []
    };
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    console.log(m);
    var y = date.getFullYear();
	var event_arr=[];
    $.post("riliAjax",function(data){
        for(var i = 0;i< data.length;i++){
            event_arr.push({
                title: data[i].title,
                start: new Date(data[i].year, data[i].month-1, data[i].day)
            })
		}
        if($('.calendar').length > 0){
            $('.calendar').fullCalendar({
                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'month'
                },
                buttonText:{
                    today:'跳转到当天'
                },
                editable: true,
                events: event_arr
            });
        }

    },'json');
});