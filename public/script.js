// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!name || !email) {
            alert('Please enter both name and email');
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const newUser = await response.json();
            addUserToList(newUser);

            userForm.reset();
        } catch (err) {
            console.error('Error adding user:', err);
            alert(`Error adding user: ${err.message}`);
        }
    });

    const loadUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();

            users.forEach(user => addUserToList(user));
        } catch (err) {
            console.error('Error loading users:', err);
            alert('Error loading users');
        }
    };

    const addUserToList = (user) => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
    };

    loadUsers();
});
