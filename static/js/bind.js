var data=[];
var WelcomeMsg = "Hi, I am NTU's ChatBot!. How can I help you?";


function addBr(text){
    return text.replace(/\n/g, "<br />");
}

// Open the page and load the initial welcome msg
$(window).load(function () {
    showBotMessages(null);
});

var Message;

Message = function (arg) {

    this.text = arg.text, 
    this.buttons = arg.buttons,
    this.message_side = arg.message_side,
    this.image = arg.image,
    this.element = arg.element,
    this.attachment = arg.attachment;


    this.draw = function (_this) {

        var content;
        var type;

        if (_this.text !== null){
            type = ".text";
            content = _this.text;
        }else if (_this.image !== null){
            type = ".image";
            content = _this.image;
        }else if (_this.buttons.length >= 1 && _this.buttons.length !== undefined){
            type = ".button";
            content = _this.buttons;
        }else if (_this.element.length >= 1 && _this.element !== undefined){
            type = ".element";
            content = _this.element;
        }else if (_this.attachment.length >= 1 && _this.attachment !== undefined){
            type = ".attachment";
            content = _this.attachment;
        }

        return function () {
            var $message;
            $message = $($('.message_template').clone().html());

            if(type === ".text"){
                $message.addClass(_this.message_side).find('.text').html(addBr(content));
            }else if(type === ".image"){
                $message.addClass(_this.message_side).find('.img').html(content);
            }else if(type === ".button"){      
                $message.addClass(_this.message_side).find('.button').html(content);          
            }

            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};

function showBotMessages(msgs){

    if(msgs=== null || msgs === undefined){
        showBotMessage(null);
    }else{
        // Loop and call bind message function one by one
        msgs.forEach(function(e) {
            showBotMessage(e);
        });
    }

}

function showBotMessage(msg){

    $messages = $('.messages');
    var text = null;
    var image = null;
    var buttons = [];
    var element = [];
    var attachment = [];

    //console.log("======msg======");
    //console.log(msg);
    

    if(msg === null){
        
        // if not msg , then show welcome msg
        message = new Message({
            text: WelcomeMsg,
            image: image,
            buttons: buttons,
            element: element ,
            attachment: attachment,
            message_side: 'left'
        });

    }else{
        
        if (msg.text !== null && msg.text !== undefined){
            text = msg.text;
        }else if(msg.image !== null && msg.image !== undefined){
            image = new Image();
            image.src = msg.image;
        }else if(msg.buttons !== null && msg.buttons !== undefined){

            console.log("Creating buttons~");
            
            for(var i = 0; i < msg.buttons.length; i++){
                buttons.push(document.createElement("button")); 
                var reply = msg.buttons[i].payload;
                var t = document.createTextNode(msg.buttons[i].title);
                buttons[i].appendChild(t);
                buttons[i].style.cssText = "margin-right:10px";
                buttons[i].className += msg.buttons[i].title+" btn btn-info";
                buttons[i].value = reply;
                buttons[i].onclick = ()=>pressButton(buttons[i].value);  
                document.body.appendChild(buttons[i]);
                document.body.appendChild(document.createElement("br"));
            }

            
        }else if(msg.element !== null && msg.element !== undefined){
            element = msg.element;
        }else if (msg.attachment !== null && msg.attachment !== undefined){
            attachment = msg.attachment;
        }
        
        // Binded single message from backend
        message = new Message({
            text: text,
            image: image,
            buttons: buttons,
            element: element ,
            attachment: attachment,
            message_side: 'left'
        });
    }

    message.draw();
    
    $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}

function showUserMessage(msg){
    $messages = $('.messages');
    message = new Message({
        text: msg,
        message_side: 'right'
    });
    message.draw();
    $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    $('#msg_input').val('');
}


function sayToBot(text){
    document.getElementById("msg_input").placeholder = "Type your messages here..."
    $.post("/chat",
        {
            text:text,
        },
        function(jsondata){

            jsondata = JSON.parse(jsondata);
              
            if(jsondata["status"]=="success"){    
                response=jsondata["response"];
                if(response){showBotMessages(response);}
            }
        }
    );
}

function pressButton(msg){
    showUserMessage(msg);
    sayToBot(msg);
}

getMessageText = function () {
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
};

$("#say").keypress(function(e) {
    if(e.which == 13) {
        $("#saybtn").click();
    }
});

// After user press enter, it will trigger this function
$('.send_message').click(function (e) {
        msg = getMessageText();
        if(msg){
        showUserMessage(msg);
        sayToBot(msg);
    $('.message_input').val('');}
});

$('.message_input').keyup(function (e) {
    if (e.which === 13) {
        msg = getMessageText();
        if(msg){
        showUserMessage(msg);
        sayToBot(msg);
    $('.message_input').val('') ;}
    }
});
