    var uri = 'http://www.nbrb.by/API/';
    $('#btn').click(function () {
        $.getJSON(uri + 'ExRates/Rates/Dynamics/' + $('#currency').val(), { 'startDate': parseRuDate($('#ifrom').val()).toUTCString(), 'endDate': parseRuDate($('#ito').val()).toUTCString() })
          .done(function (data) {
              $.each(data, function (key, item) {
                  $('<li>', { text: JSON.stringify(item) }).appendTo($('#res'));
              });
              $('#btn').removeAttr("disabled");
        }).error(function (err) {
              $('#btn').removeAttr("disabled");
              alert('ошибка');
        });
    });

    $('#graph-table').click(function () {
        switch ($('#graph-table').val()) {
            case '0':
                $('#tableCur').hide();
                $('#myChart').show();
                break;
            case '1':
                $('#myChart').hide();
                $('#tableCur').show();
                break;
        };
    });