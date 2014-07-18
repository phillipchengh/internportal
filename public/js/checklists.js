  $('input.checkboxitem').change(function() {
    var checklistKey = $(this).attr('data-group');
    var checked = 0;
    var total = 0;
    $('input.' + checklistKey).each(function() {
      if ($(this).prop('checked')) {
       checked++; 
      }
      total++;
    });
    var ariaValue = 100*checked/total;
    $('.progress .' + checklistKey).attr('aria-valuenow', ariaValue).css('width', ariaValue + '%');
  });
  $('input.checkboxitem').change();
