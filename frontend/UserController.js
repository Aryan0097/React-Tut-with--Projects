angular.module('adminPanelApp', [])
    .controller('DataController', function($http) {
        var ctrl = this;

        ctrl.users = []; // Initialize users array
        ctrl.formTitle = 'Create User'; // Initialize form title
        ctrl.submitBtnText = 'Create'; // Initialize submit button text

        // Fetch all users from backend
        ctrl.getAllUsers = function() {
            $http.get('http://localhost:8080/users')
                .then(function(response) {
                    ctrl.users = response.data;
                })
                .catch(function(error) {
                    console.error('Error fetching users:', error);
                });
        };

        // Function to create or update user
        ctrl.submitUser = function() {
            if (ctrl.submitBtnText === 'Create') {
                // Create new user
                $http.post('http://localhost:8080/users', ctrl.user)
                    .then(function(response) {
                        console.log('Response received:', response); // Log the entire response
        
                        if (response.data && typeof response.data === 'object') {
                            ctrl.users.push(response.data); // Push the response data (new user) to the users array
                            console.log('User created successfully:', response.data);
                        } else {
                            console.error('Unexpected response format:', response.data);
                        }
        
                        ctrl.getAllUsers(); // Refresh user list
                        ctrl.resetForm(); // Reset form
                    })
                    .catch(function(error) {
                        console.error('Error creating user:', error);
                    });
            } else {
                // Update existing user
                $http.put('http://localhost:8080/users/' + ctrl.user.userId, ctrl.user)
                    .then(function(response) {
                        console.log('User updated successfully:', response.data);
                        ctrl.getAllUsers(); // Refresh user list
                        ctrl.resetForm(); // Reset form
                    })
                    .catch(function(error) {
                        console.error('Error updating user:', error);
                    });
            }
        };
        

        // Function to delete user
        ctrl.deleteUser = function(userId) {
            $http.delete('http://localhost:8080/users/' + userId)
                .then(function(response) {
                    console.log('User deleted successfully:', response.data);
                    ctrl.getAllUsers(); // Refresh user list
                })
                .catch(function(error) {
                    console.error('Error deleting user:', error);
                });
        };

        // Function to handle edit user
        ctrl.editUser = function(user) {
            ctrl.user = angular.copy(user); // Copy user data to form
            ctrl.formTitle = 'Edit User'; // Change form title
            ctrl.submitBtnText = 'Update'; // Change submit button text
        };

        // Function to reset form
        ctrl.resetForm = function() {
            ctrl.user = {}; // Clear form data
            ctrl.formTitle = 'Create User'; // Reset form title
            ctrl.submitBtnText = 'Create'; // Reset submit button text
        };

        // Initial fetch of users when controller loads
        ctrl.getAllUsers();
    });
