async function submitClickHandler(event) {
    event.preventDefault();
  
    const response = await fetch('/api/posts/submit', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  
  document.querySelector('.submit').addEventListener('click', submitClickHandler);