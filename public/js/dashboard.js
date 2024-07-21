const newFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const fillEditPostForm = async (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute('id');
  const post = await fetch(`/api/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const postData = await post.json();
  document.querySelector('#edit-post-title').value = postData.title;
  document.querySelector('#edit-post-content').value = postData.content;
  document.querySelector('#update-post').setAttribute('data-id', postId);
  document.querySelector('#delete-post').setAttribute('data-id', postId);
}

const updateButtonHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('data-id');
  const title = document.querySelector('#edit-post-title').value;
  const content = document.querySelector('#edit-post-content').value;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update post');
  }
};



document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#delete-post')
  ?.addEventListener('click', delButtonHandler);

document
  .querySelectorAll('.edit-post-open').forEach(element => {
    element?.addEventListener('click', fillEditPostForm);
  })

document
  .querySelector('#update-post')
  ?.addEventListener('click', updateButtonHandler);
