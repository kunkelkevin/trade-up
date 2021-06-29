async function newFormHandler(event) {
  event.preventDefault();
  const console_type = document.querySelector("#consoles").value;
  const pic_link = "";
  const title = document.querySelector('input[name="post-title"]').value;
  const description = document.querySelector(
    'textarea[name="post-description"]'
  ).value;
  const quality = parseInt(document.querySelector("#quality").value);
  console.log(console_type, pic_link, title, description, quality);
  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      console_type: console_type,
      pic_link: pic_link,
      title: title,
      description: description,
      quality: quality,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
