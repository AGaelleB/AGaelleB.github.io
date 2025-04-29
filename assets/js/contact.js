// assets/js/contact.js

// reutiliser ma fonction pour apliquer aussi a mon tite le typewritter

document.querySelector('.contact-form form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Vérifiez que les champs ne sont pas vides
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Simuler l'envoi (ou utiliser une vraie API)
    console.log('Nom :', name);
    console.log('Email :', email);
    console.log('Message :', message);

    // Afficher un message de confirmation
    alert('Votre message a été envoyé avec succès !');

    // Réinitialiser le formulaire
    this.reset();
});

