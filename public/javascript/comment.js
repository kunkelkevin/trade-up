async function commentFormHandler(event) {
  debugger;
  event.preventDefault();
  console.log("We went to the form handler", event.target);
  const comment_text = event.target.querySelector("#comment-body").value.trim();
  console.log(event.target);
  console.log(event.target.getAttribute("data-offer-id"));
  //   const offer_id = `{{offer.id}}`;
  // if (event.target.getAttribute("data-offer-id")) {
  const offer_id = parseInt(event.target.getAttribute("data-offer-id"));
  // }
  console.log(comment_text, offer_id);

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
      // document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#offer-area")
  .addEventListener("submit", commentFormHandler);
