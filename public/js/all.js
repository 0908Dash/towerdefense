function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  }else{
    document.getElementById('menu').style.borderRadius = '0px';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Whitelist of allowed IP addresses for admin pages
  const whitelist = ['173.17.76.238'];

  // Function to check if an IP address is in the whitelist
  function isAllowedIP(ip) {
      return whitelist.includes(ip);
  }

  // Function to display admin pages if the user's IP is in the whitelist
  function showAdminPages(ip) {
      const adminPageLink = document.getElementById('adminPage');
      if (isAllowedIP(ip)) {
          adminPageLink.style.display = 'block'; // Show the admin page link
      } else {
          adminPageLink.style.display = 'none'; // Hide the admin page link
      }
  }

  // Get the user's IP address using the ipify.org API with a delay
  setTimeout(function () {
      fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => {
              const ipAddress = data.ip;
              showAdminPages(ipAddress);
          })
          .catch(error => {
              console.log('Error:', error);
          });
  }, 2000); // 2000 milliseconds (2 seconds) delay before making the IP address request

  // Check if the user is signed in (simulated by fetching user data)
    fetchUserData().then((userData) => {
        const signUpLink = document.getElementById('sign-up-link');
        const signInLink = document.getElementById('sign-in-link');
        const profilePic = document.getElementById('profile-pic');
        const profileLink = document.getElementById('profile-link'); // Get the anchor element

        if (userData && userData.profilePicUrl) {
            // If the user is signed in
            signUpLink.style.display = 'none';
            signInLink.style.display = 'none';

            // Update profile picture and link to user's profile
            profilePic.src = userData.profilePicUrl;
            profilePic.style.display = 'block'; // Show the profile picture
            profileLink.href = '/user-profile'; // Update the link to the user's profile page
        } else {
            // If the user is not signed in
            signUpLink.style.display = 'block';
            signInLink.style.display = 'block';
            profilePic.src = 'https://tinyurl.com/default-pic'; // Set default profile picture
            profilePic.style.display = 'block'; // Show default picture
            profileLink.href = '#'; // Set the link to "#", or you can redirect to sign-in page
        }
    });

  // Event listener for the theme link
  const themeLink = document.getElementById('theme-link');
  themeLink.addEventListener('click', function (event) {
      event.preventDefault();
      showThemePopup();
  });

  // Function to show theme selection popup
  function showThemePopup() {
      const theme = prompt('Please select a theme: dark, light, or system');
      if (theme === 'dark' || theme === 'light' || theme === 'system') {
          setTheme(theme);
      } else {
          alert('Invalid theme selection. Please choose between dark, light, or system.');
      }
  }

  // Function to apply the theme
  function setTheme(theme) {
      if (theme === 'system') {
          applySystemTheme();
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);
      } else {
          document.documentElement.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
      }
  }

  // Apply system theme based on system preference
  function applySystemTheme() {
      const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = prefersDarkScheme ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
  }

  // Load saved theme from local storage or default to system
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      setTheme(savedTheme);
  } else {
      setTheme('system'); // Default to system if no theme is saved
  }
});

// Function to fetch user data from your server
function fetchUserData() {
  return fetch('/api/user-data')
      .then(response => response.json())
      .catch(error => {
          console.log('Error fetching user data:', error);
          return null;
      });
}
