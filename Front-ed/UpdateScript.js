document.getElementById('updateForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('updateId');
    const email = formData.get('updateEmail');

    try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const result = await response.json();
        console.log('User updated:', result);
        event.target.reset();
    } catch (error) {
        console.error('Error updating user:', error);
    }
});