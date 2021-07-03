async function newFormHandler(event) {
  event.preventDefault();
  const console_type = document.querySelector("#consoles").value;
  const title = document.querySelector('input[name="post-title"]').value;
  const description = document.querySelector(
    'textarea[name="post-description"]'
  ).value;
  const quality = document.querySelector("#quality").value;
  console.log(quality);
  const imgPath = document.querySelector("#post_img").value.split(".");
  const pic_link = imgPath[imgPath.length - 1];
  const filereader = new FileReader();
  filereader.readAsDataURL(upload.cachedFileArray[0]);
  if (title) {
    filereader.onload = await function () {
      const imgDataURL = filereader.result.split(",")[1];
      fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          console_type: console_type,
          pic_link: pic_link,
          title: title,
          description: description,
          quality: quality,
          img: imgDataURL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          // document.location.replace("/dashboard");
        } else {
          alert(response.statusText);
        }
      });
    };
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
