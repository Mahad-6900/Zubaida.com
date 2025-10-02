(function() {
    emailjs.init("6slNOmiDF01SN_ZLk"); // <-- replace with your EmailJS Public Key
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_qyc2bos', 'template_keu8f0u', this)
      .then(() => {
        alert('✅ Message Sent Successfully!');
        document.getElementById('contact-form').reset();
      }, (error) => {
        alert('❌ FAILED... ' + error.text);
      });
  });