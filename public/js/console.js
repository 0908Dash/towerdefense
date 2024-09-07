document.addEventListener('DOMContentLoaded', () => {
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  const contentDiv = document.getElementById('content');

  function showSection(sectionId) {
      contentDiv.innerHTML = ''; // Clear the current content
      
      if (sectionId === 'all') {
          contentDiv.innerHTML = `
              <h2>All Consoles</h2>
              <div id="all-consoles-output">
                  <p>Displaying combined output of HTTP Server and Discord Bot logs here...</p>
              </div>`;
      } else if (sectionId === 'HTTP-Server') {
          contentDiv.innerHTML = `
              <h2>HTTP Server Console</h2>
              <div id="http-server-output">
                  <p>Displaying HTTP Server logs here...</p>
              </div>`;
      } else if (sectionId === 'Discord-bot') {
          contentDiv.innerHTML = `
              <h2>Discord Bot Console</h2>
              <div id="discord-bot-output">
                  <p>Displaying Discord Bot logs here...</p>
              </div>`;
      } else if (sectionId === 'Cmds-List') {
          contentDiv.innerHTML = `
              <h2>Commands List</h2>
              <div id="cmds-list-output">
                  <p>Listing all commands here...</p>
              </div>`;
      } else if (sectionId === 'Analytics') {
          contentDiv.innerHTML = `
              <h2>Analytics</h2>
              <div id="analytics-output">
                  <p>Displaying analytics here...</p>
              </div>`;
      } else if (sectionId === 'Bot-Files') {
          contentDiv.innerHTML = `
              <h2>Bot Files</h2>
              <div id="bot-files-output">
                  <p>Displaying bot-related files here...</p>
              </div>`;
      } else {
          contentDiv.innerHTML = '<h2>Select a Section</h2>';
      }
  }

  // Add click event listeners to each sidebar link
  sidebarLinks.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default anchor behavior
          const target = event.target.getAttribute('data-target');
          showSection(target); // Show the corresponding section
      });
  });

  // Initialize with default section (e.g., 'all' console view)
  showSection('all');
});
