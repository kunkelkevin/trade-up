async function commentFormHandler(event) {
  event.preventDefault();
  const comment_text = event.target.querySelector("#comment-body").value.trim();
  const offer_id = parseInt(event.target.getAttribute("data-offer-id"));

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        offer_id,
        comment_text,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#offer-area")
  .addEventListener("submit", commentFormHandler);
