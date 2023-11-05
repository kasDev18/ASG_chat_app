$(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  $('.notif-icon').on('mouseover', function() {
    // $('.notif-icon a').addClass('border rounded border-primary');
    $('.notif-icon i').addClass('text-primary')
  })

  $('.notif-icon a').on('mouseout', function() {
    // $('.notif-icon a').removeClass('border rounded border-primary');
    $('.notif-icon i').removeClass('text-primary')
    // $(this).removeClass('text-primary');
  })
  
});

