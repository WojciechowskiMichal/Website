/*==================== Toggle Icon Navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== Scroll Sections Active Link ====================*/
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
    
    /*==================== Sticky Navbar ====================*/
    let header = document.querySelector('header');

    navbar.classList.toggle('sticky', window.scrollY > 100);

    /*==================== Remove Toggle Icon And Navbar When Clicking Navbar Links (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== Scroll Reveal ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading, .tab, .timeline', { origin: 'top' });
ScrollReveal().reveal('.home-img, .activity-container, .portfolio-box, .contact form, .home-content h1', { origin: 'bottom' });    
ScrollReveal().reveal(' .about-img, .creator-container, .content2, .left', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .creator-container-skils, .content, .right', { origin: 'right' });

/*==================== Typed JS ====================*/
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


/*==================== Close Notification ====================*/
function closenotification() {
    var notification = document.getElementById("notification");
    notification.style.display = "none";
}

/*==================== Contact Form ====================*/
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("myForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) {
            alert("Please fix the errors in the form.");
            return;
        }

        var formData = new FormData(form);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/php/send_form.php", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        document.getElementById("message-text").innerText = response.message;
                        document.getElementById("notification").style.display = "block";
                        form.reset();
                    } else {
                        alert("An error occurred: " + response.message);
                    }
                } else {
                    alert("An error occurred: " + xhr.status);
                }
            }
        };
        xhr.send(formData);
    });
});

/*==================== Email Validations ====================*/

function validateForm() {
    var fullName = document.forms["myForm"]["full_name"].value;
    var email = document.forms["myForm"]["email"].value;
    var email_subject = document.forms["myForm"]["email_subject"].value;
    var mobileNumber = document.forms["myForm"]["mobile_number"].value;
    var message = document.forms["myForm"]["message"].value;

    if (fullName.length > 35) {
        alert("Full Name must not exceed 35 characters.");
        return false;
    }

    if (email.length > 50) {
        alert("Email must not exceed 50 characters.");
        return false;
    }

    if  (email_subject.length > 100){
        alert("Email Subject mus not exceed 100 characters.")
        return false;
    }

    if (!mobileNumber.match(/^\d{0,9}$/)) {
        alert("Mobile Number must be up to 9 digits.");
        return false;
    }

    if (message.length > 300) {
        alert("Message must not exceed 300 characters.");
        return false;
    }

    return true;
}

function enableSubmit() {
    document.getElementById('submit-button').disabled = false;
}
