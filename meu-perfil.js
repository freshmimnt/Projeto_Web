function toggleEdit() {
    const editBtn = document.getElementById('edit-profile-btn');
    const editFields = document.querySelectorAll('[id^=edit-]');
    const userFields = document.querySelectorAll('[id^=user-]');
    
    if (editBtn.innerText === 'Edit Profile') {
        editBtn.innerText = 'Save Changes';
        editFields.forEach(field => {
            field.style.display = 'inline';
        });
        userFields.forEach(field => {
            field.style.display = 'none';
        });
    } else {
        editBtn.innerText = 'Edit Profile';
        editFields.forEach(field => {
            field.style.display = 'none';
        });
        userFields.forEach(field => {
            field.style.display = 'inline';
        });
    }
}

// Add event listener to the edit profile button
document.getElementById('edit-profile-btn').addEventListener('click', toggleEdit);