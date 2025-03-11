function confirmDisableUser(userId) {
    if (confirm("Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?")) {
        fetch(`/admin/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.reload();
        })
        .catch(error => {
            alert("Une erreur s'est produite lors de la suppression de l'utilisateur.");
        });
    }
}

//On ne peut pas supprimer
//uses axios 