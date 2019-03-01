
  $(function(){
    $( "#input" ).datepicker();
  });
   $(function(){
     $( "#input2" ).datepicker();
   });

const show = () => {
  let input = document.getElementById("input").style.zIndex = "2";
  document.getElementById("input").style.background = "#f9f9f9";
  document.getElementById("input").style.height = "15vh";
  document.getElementById("input").style.width = "38%";
  document.getElementById("input").style.borderRadius = "10px";
  document.getElementById("input").style.marginTop = "1vh";
}

const showNew = () => {
  let input = document.getElementById("input2").style.zIndex = "2";
  document.getElementById("input2").style.background = "#f9f9f9";
  document.getElementById("input2").style.height = "15vh";
  document.getElementById("input2").style.width = "38%";  
  document.getElementById("input2").style.borderRadius = "10px";
  document.getElementById("input2").style.color = "#555";
  document.getElementById("input2").style.marginTop = "1vh";
}



$("#input").datepicker({    
  defaultDate: "+0",              
  dateFormat: "dd/mm/yy",
  minDate: "+0",
  onSelect: function (dateText, inst) {
      var d = $.datepicker.parseDate(inst.settings.dateFormat, dateText);
   d.setDate(d.getDate() + 1);
      $("#input2").val($.datepicker.formatDate(inst.settings.dateFormat, d));
      showNew();
 },

  // onClose: function (selectedDate) {
  //     $("#input2").datepicker("option", "minDate", selectedDate);    
  // }
});

$( document ).ready(function() {
  $(".div-header-target").slick({
    arrows:false
  });
});

$( document ).ready(function() {
  $(".div-carousel").slick({
    arrows:false
  });
});

$("#input2").datepicker({    
  defaultDate: "+0",              
  dateFormat: "dd/mm/yy",
  minDate: "+0",
  onSelect: function (dateText, inst) {
      var d = $.datepicker.parseDate(inst.settings.dateFormat, dateText);
   d.setDate(d.getDate());
      $("#input2").val($.datepicker.formatDate(inst.settings.dateFormat, d));
      showNew();
 },

  // onClose: function (selectedDate) {
  //     $("#input2").datepicker("option", "minDate", selectedDate);    
  // }
});

$( document ).ready(function() {
  $(".div-header-target").slick({
    arrows:false
  });
});
$( document ).ready(function() {
  $(".contentImageRoom").slick({
    arrows:false
  });
});
$( document ).ready(function() {
  $(".div-carousel").slick({
    arrows:false
  });
});

$( document ).ready(function() {
  $(".divActiveGallery").slick({
    arrows:false
  });
  $(".divActiveGalleryRoom").slick({
    arrows:false
  });
});

// Sign Up PWAS
((d,w,n,c) => {
// PWA CODE
if('serviceWorker' in n){
  w.addEventListener('load',() =>{
    n.serviceWorker.register('./sw.js')
    .then( registration =>{
      c(registration)
      c('Service Worker registered succelly',registration.scope)
    })
    .catch( err => c('Register failed',err))
  })
}
// NOTIFICATION
if(w.Notification && Notification.permission !== 'denied'){
    Notification.requestPermission(status => {
      c(status)
      let n =  new Notification('Tittle',{
        body: 'Its a Notification',
        icon:'./img/logo.png'
      })
    })
}
})(document, window, navigator, console.log);

// state of the conection
((d,w,n,c) => {
const header = d.querySelector('.headerApp'),
    metaTagTheme = d.querySelector('meta[name=theme-color]')

  function networkStatus(e){
    c(e, e.type)
    if(n.onLine){
      metaTagTheme.setAttribute('content', '#2b2e34')
    }else{
      metaTagTheme.setAttribute('content','#000')
      alert('conexion perdida')
    }
  }
  d.addEventListener('DOMContentLoaded', e =>{

    if( !n.onLine){
      networkStatus(this)
    }
    w.addEventListener('online',networkStatus)
    w.addEventListener('offline',networkStatus)
  })
})(document, window, navigator, console.log);



