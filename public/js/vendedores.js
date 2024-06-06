$(document).ready(function() {
    
    $.ajax({
      url: '/sellers', 
      method: 'GET',
      success: function(data) {
        var vendedores = data.vendedores; 
  
       
        $('#sellerRow').empty();
  
   
        vendedores.forEach(function(vendedor) {
          var form = $('<form>').attr('action', '/pagina_da_loja.html');
          var button = $('<button>').addClass('seller-btn');
          var img = $('<img>').attr('src', vendedor.imagem).attr('alt', '');
          var nome = $('<h3>').text(vendedor.nome);
          var tipo = $('<h4>').text(vendedor.tipo);
  
          button.append(img, nome, tipo);
          form.append(button);
          $('#sellerRow').append(form);
        });
  
        
        initMap(vendedores);
      },
      error: function(error) {
        console.error('Erro ao obter os dados dos vendedores:', error);
      }
    });
  });
  
  
  function initMap(vendedores) {
    var mapOptions = {
      center: { lat: 38.736946, lng: -9.142685 }, 
      zoom: 12
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    
    vendedores.forEach(function(vendedor) {
      var marker = new google.maps.Marker({
        position: { lat: vendedor.latitude, lng: vendedor.longitude }, 
        map: map,
        title: vendedor.nome
      });
    });
  }