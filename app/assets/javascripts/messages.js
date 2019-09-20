$(function() {
  function buildHTML(message){
    var addImage = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                    ${ message.content }<br/>
                    </p>
                    ${ addImage }
                  </div>
                </div>`;
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $( ".form__submit").prop( "disabled", false );
      $('.chat-main').animate({scrollTop: $('#message')[0].scrollHeight}, 'fast');
      $('.hidden').remove();
    })
   .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })

  function update() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var lastMessageId = ($('.message')[0]) ? $('.message:last').data('message-id') : 0;
      $.ajax({
        url: "api/messages",
        type: 'get',
        data: { id : lastMessageId },
        dataType: 'json'
      })
    .done(function(messages) {
      if (messages.length){
        $.each(messages, function(i, messages){
          var html = buildHTML(messages);
          $('.messages').append(html)
        })
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
};
  setInterval(update, 5000);
});