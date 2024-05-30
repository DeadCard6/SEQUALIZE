document.getElementById('deleteForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('deleteId');

    try {
        await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        });
        console.log('User deleted');
        event.target.reset();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
});
