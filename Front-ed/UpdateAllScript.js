document.getElementById('updateAllForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('updateId');
    const PrimerApellido = formData.get('updatePrimerApellido');
    const SegundoApellido = formData.get('updateSegundoApellido');
    const PrimerNombre = formData.get('updatePrimerNombre');
    const SegundoNombre = formData.get('updateSegundoNombre');
    const email = formData.get('updateEmail');

    // Construir el objeto de datos
    const data = {
        PrimerApellido,
        SegundoApellido,
        PrimerNombre,
        SegundoNombre,
        email
    };

    // Verificar los datos que se envían
    console.log('Datos enviados:', data);

    try {
        const response = await fetch(`http://localhost:3000/users/alldata/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('User updated:', result);
        event.target.reset();
    } catch (error) {
        console.error('Error updating user:', error);
    }
});