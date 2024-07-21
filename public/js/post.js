const newFormHandler = async (event) => {
    event.preventDefault();
    const comment = document.querySelector('#post-comment').value.trim();
    const postId = document.querySelector('.post-block').getAttribute('id');
  
    if (comment) {
      const response = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        body: JSON.stringify({ content: comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };

document
  .querySelector('#submit-comment')
  .addEventListener('click', newFormHandler);
