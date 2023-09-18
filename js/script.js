/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
        }
    });
    
    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    navbar.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when clicking navbar links (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== scroll reveal ====================*/

ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading, .tab', { origin: 'top' });
ScrollReveal().reveal('.home-img, .activity-container, .portfolio-box, .contact form, .home-content h1', { origin: 'bottom' });    
ScrollReveal().reveal(' .about-img, .creator-container', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .creator-container-skils', { origin: 'right' });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['a Student', 'an Engineer', 'a Frontend Developer', 'a DJ'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

  function openActivity(evt, activityName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
  
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    var tablinks = document.getElementsByClassName("tablinks");
  
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(activityName).style.display = "block";
  
    evt.currentTarget.className += " active";
  
    document.querySelector(".tab-container").style.display = "block";
  }
  
  function updateProgressBar(progress) {
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progress + "%";
    progressBar.innerHTML = progress + "%";
}

function zamknijPowiadomienie() {
  var powiadomienie = document.getElementById("powiadomienie");
  powiadomienie.style.display = "none";
}

function zamknijPowiadomienie() {
  var powiadomienie = document.getElementById("powiadomienie");
  powiadomienie.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  var messageContainer = document.getElementById("message-container");
  var powiadomienie = document.getElementById("powiadomienie");
  var messageText = document.getElementById("message-text");

  if (messageContainer) {
      messageContainer.style.display = "none";

      // Obsługa wysłania formularza za pomocą AJAX
      var form = document.querySelector("form");
      form.addEventListener("submit", function (event) {
          event.preventDefault(); // Zatrzymaj domyślne zachowanie formularza

          var formData = new FormData(form);

          // Wyślij dane formularza za pomocą AJAX
          var xhr = new XMLHttpRequest();
          xhr.open("POST", "new/php/send_form.php", true);
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                      var response = JSON.parse(xhr.responseText);
                      if (response.success) {
                          messageText.innerText = response.message;
                          powiadomienie.style.display = "block";
                      } else {
                          // Obsługa błędu
                          alert("Wystąpił błąd: " + response.message);
                      }
                  } else {
                      // Obsługa błędu zapytania AJAX
                      alert("Wystąpił błąd: " + xhr.status);
                  }
              }
          };
          xhr.send(formData);
      });
  }
});
