var myLineChart;
var myBarChart;
function call_backend(input, url, callback){
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(input),
        contentType: "application/json; charset=utf-8",
        success : callback,
        error : function (){
            console.log("error in processing your request");
        }
    });
}

call_backend(null, '/category_analysis', function(return_var){
    
    var hit_amount = return_var.hit_amount; 
    var get_num_element = document.getElementById("num_questions");
    get_num_element.innerHTML = hit_amount;

    var resolved_num = return_var.resolved_num;
    var get_num_questions = document.getElementById("num_resolved");
    get_num_questions.innerHTML = resolved_num;

    var accuracy_rate = return_var.accuracy_rate;
    var get_accuracy_rate = document.getElementById("accuracy_rate");
    get_accuracy_rate.innerHTML = accuracy_rate+"%";
    
    var hit_list = return_var.hit_day_list;
    var hit_unsolved_count = return_var.hit_day_unresolved_num;
    var hit_solved_count = return_var.hit_day_resolved_num;
    var hit_total_count = return_var.hit_day_count;
    var resolved_rate = return_var.hit_day_resolved_rate;

    var question_analysis_index = return_var.question_analysis_index;
    var question_analysis_list = return_var.question_analysis_list;
    var question_analysis_count = return_var.question_analysis_count;
    

    var top_question_dashboard = "<div class='limiter'><div class='wrap-table100'><div class='tablestyle'><div class='rowstyle' style='text-align:center;font-weight:bolder;'><div class='cell'>Rank</div><div class='cell'>Question</div><div class='cell'>Frequency</div></div>";
    for (var num in question_analysis_list) { 
        top_question_dashboard += "<div class='rowstyle'><div class='cell' style='text-align:center;font-weight:bolder;font-size:20px'>" + (question_analysis_index[num]+1) + "</div><div class='cell'>" + question_analysis_list[num] + "</div><div class='cell' style='text-align:center'>" + question_analysis_count[num] + "</div></div>";
    }
    top_question_dashboard += "</div></div></div>";

    var get_top_question = document.getElementById("top_question_dashboard");
    get_top_question.innerHTML = top_question_dashboard;

    var hit_count_max = Math.max.apply(null, hit_total_count);

    if(hit_count_max >= 0 && hit_count_max <= 10){
        hit_count_max = 10;
    }else if(hit_count_max > 10 && hit_count_max <= 1000){
        hit_count_max = Math.max.apply(null, hit_total_count)+(100 - Math.max.apply(null, hit_total_count) % 100);
    }else{  
        hit_count_max = Math.max.apply(null, hit_total_count)+(1000 - Math.max.apply(null, hit_total_count) % 1000);
    }

    // -- Create Area Chart for hit analysis
    var ctx = document.getElementById("myAreaChart");
    window.myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hit_list,
            datasets: [
                {
                    label:'Accuracy Rate',
                    data:resolved_rate,
                    fill:false,
                    type:'line',
                    borderColor:'#3c8dbc',
                    // backgroundColor:'#3c8dbc',
                    yAxisID:'line-yAxisID',
                        // Stroke style of the legend box
                    fontWeight: "bold",
                    // Point style of the legend box (only used if usePointStyle is true)
                    pointStyle: String
                },
                {
                    label: "Resolved Questions",
                    lineTension: 0.3,
                    fill:true,
                    type:'bar',
                    backgroundColor: "#00a65a",
                    borderColor: "#00a65a",
                    pointRadius: 5,
                    pointBackgroundColor: "#00a65a",
                    pointBorderColor: "#00a65a",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#00a65a",
                    pointHitRadius: 20,
                    pointBorderWidth: 2,
                    data: hit_solved_count,
                    yAxisID:'hit_count-yAxisID'
                },            
                {
                    label: "Unresolved Questions",
                    lineTension: 0.3,
                    fill:true,
                    type:'bar',
                    backgroundColor: "#dd4b39",
                    borderColor: "#dd4b39",
                    pointRadius: 5,
                    pointBackgroundColor: "#dd4b39",
                    pointBorderColor: "#dd4b39",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#dd4b39",
                    pointHitRadius: 20,
                    pointBorderWidth: 2,
                    data: hit_unsolved_count,
                    yAxisID:'hit_count-yAxisID'
                }

            ],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    stacked:true,
                    ticks: {
                        maxTicksLimit: 12,
                        fontSize: 20
                        
                    }
                }],
                yAxes: [
                    {
                        id:'hit_count-yAxisID',
                        type:'linear',
                        position:'left',
                        stacked:true,
                        ticks: {
                            min: 0,
                            max: hit_count_max ,
                            maxTicksLimit: 5,
                            fontSize: 20
                        }
                    },
                    {
                        id:'line-yAxisID',
                        type:'linear',
                        position:'right',
                        stacked:true,
                        ticks: {
                            min: 0,
                            max: 100 ,
                            maxTicksLimit: 5,
                            fontSize: 20,
                            callback: function(tick) {
                                return tick.toString() + '%';
                            }
                        },
                        gridLines: {
                            display:false
                        }
                    }
                ],
            },
            legend: {
                display: true
            }
        }
    });
})


function getpicker(){
    
    return currentDate;

}

function filterChart() {
  
    var SendInfo = {};
    var date_chosen = $('#datepicker').datepicker( "getDate" );
    var checkselected = document.querySelector('input[name="choice"]:checked').value

    var year_chosen = (new Date()).getFullYear();
    var month_chosen = (new Date()).getMonth()+1;
    var day_chosen = (new Date()).getDate(); 

    if (checkselected == "year" ){
        var year = document.getElementById("chooseyear").value;
        if(year != null && year.length != 0){
            year_chosen = parseInt(document.getElementById("chooseyear").value);    
        }
    }else if(checkselected == "month" ){
        var year = document.getElementById("chooseyear").value;
        if(year != null && year.length != 0){
            year_chosen = parseInt(document.getElementById("chooseyear").value);   
        }
        var month = document.getElementById("choosemonth").value;
        if(month != null && month.length != 0){
            month_chosen = parseInt(document.getElementById("choosemonth").value);  
        }   
    }else if(checkselected == "day"){
        if (date_chosen != null){
            year_chosen = date_chosen.getFullYear();
            month_chosen = date_chosen.getMonth()+1;
            day_chosen = date_chosen.getDate();
        }
    }

        
    SendInfo.year = year_chosen;
    SendInfo.month = month_chosen;
    SendInfo.day = day_chosen;
    SendInfo.choice = checkselected;
    call_backend(SendInfo, '/breakdown_analysis', function(getData){

        if(getData.error==0) {
            
            var new_hit_amount = getData.hit_amount; 
            new_get_num_element = document.getElementById("num_questions");
            new_get_num_element.innerHTML = new_hit_amount;
    
            var new_resolved_num = getData.resolved_num;
            new_get_num_questions = document.getElementById("num_resolved");
            new_get_num_questions.innerHTML = new_resolved_num;
    
            var accuracy_rate = getData.accuracy_rate;
            new_get_accuracy_rate = document.getElementById("accuracy_rate");
            new_get_accuracy_rate.innerHTML = accuracy_rate+"%";
    
            var new_hit_list = getData.hit_day_list;
            var new_hit_unsolved_count = getData.hit_day_unresolved_num;
            var new_hit_solved_count = getData.hit_day_resolved_num;
            var new_hit_total_count = getData.hit_day_count;
            var new_resolved_rate = getData.hit_day_resolved_rate;
            
            var new_hit_count_max = new_hit_amount;
    
            if(new_hit_count_max >= 0 && new_hit_count_max <= 10){
                new_hit_count_max = 10;
            }else if(new_hit_count_max > 10 && new_hit_count_max <= 1000){
                new_hit_count_max = Math.max.apply(null, new_hit_total_count)+(100 - Math.max.apply(null, new_hit_total_count) % 100);
            }else{
                new_hit_count_max = Math.max.apply(null, new_hit_total_count)+(1000 - Math.max.apply(null, new_hit_total_count) % 1000);
            }
   
            var new_question_analysis_index = getData.question_analysis_index;
            var new_question_analysis_list = getData.question_analysis_list;
            var new_question_analysis_count = getData.question_analysis_count;
            
            var top_question_dashboard = "<div class='card-body'>There is no resolved questions available for analysis for the selected time period.</div>";
            if(new_question_analysis_list.length != 0){
                var top_question_dashboard = "<div class='limiter'><div class='wrap-table100'><div class='tablestyle'><div class='rowstyle' style='text-align:center;font-weight:bolder;'><div class='cell'>Rank</div><div class='cell'>Question</div><div class='cell'>Frequency</div></div>";
                for (var num in new_question_analysis_list) { 
                    top_question_dashboard += "<div class='rowstyle'><div class='cell' style='text-align:center;font-weight:bolder;font-size:20px'>" + (new_question_analysis_index[num]+1) + "</div><div class='cell'>" + new_question_analysis_list[num] + "</div><div class='cell' style='text-align:center'>" + new_question_analysis_count[num] + "</div></div>";
                }
                top_question_dashboard += "</div></div></div>";
            }
         
            var get_top_question = document.getElementById("top_question_dashboard");
            get_top_question.innerHTML = top_question_dashboard;
    
            destory_and_update_line(new_hit_list,new_resolved_rate,new_hit_solved_count,new_hit_unsolved_count,new_hit_count_max);
        }
    })
    
}

function destory_and_update_line (new_hit_list,new_resolved_rate,new_hit_solved_count,new_hit_unsolved_count,new_hit_count_max){

    if (window.myLineChart!= null){
        window.myLineChart.destroy();
    };
    
    var ctx = document.getElementById("myAreaChart");
    window.myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: new_hit_list,
            datasets: [
                {
                    label:'Accuracy Rate',
                    data:new_resolved_rate,
                    fill:false,
                    type:'line',
                    borderColor:'#3c8dbc',
                    // backgroundColor:'#3c8dbc',
                    yAxisID:'line-yAxisID'
                },
                {
                    label: "Resolved Questions",
                    lineTension: 0.3,
                    type:'bar',
                    backgroundColor: "#00a65a",
                    borderColor: "#00a65a",
                    pointRadius: 5,
                    pointBackgroundColor: "#00a65a",
                    pointBorderColor: "#00a65a",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#00a65a",
                    pointHitRadius: 20,
                    pointBorderWidth: 2,
                    data: new_hit_solved_count,
                    yAxisID:'hit_count-yAxisID'
                },            
                {
                    label: "Unresolved Questions",
                    lineTension: 0.3,
                    type:'bar',
                    backgroundColor: "#dd4b39",
                    borderColor: "#dd4b39",
                    pointRadius: 5,
                    pointBackgroundColor: "#dd4b39",
                    pointBorderColor: "#dd4b39",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#dd4b39",
                    pointHitRadius: 20,
                    pointBorderWidth: 2,
                    data: new_hit_unsolved_count,
                    yAxisID:'hit_count-yAxisID'
                }
    
            ],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    stacked:true,
                    ticks: {
                        maxTicksLimit: 12,
                        fontSize: 20
                    }
                }],
                yAxes: [
                    {
                        id:'hit_count-yAxisID',
                        type:'linear',
                        position:'left',
                        stacked:true,
                        ticks: {
                            fontSize: 20,
                            min: 0,
                            max: new_hit_count_max ,
                            maxTicksLimit: 5
                            
                        }
                    },
                    {
                        id:'line-yAxisID',
                        type:'linear',
                        position:'right',
                        stacked:true,
                        
                        ticks: {
                            min: 0,
                            max: 100 ,
                            maxTicksLimit: 5,
                            fontSize: 20,
                            callback: function(tick) {
                                return tick.toString() + '%';
                            }
                        },
                        gridLines: {
                            display:false
                        }
                    }
                ],
            },
            legend: {               
                display: true
            }
        }
    });
}


