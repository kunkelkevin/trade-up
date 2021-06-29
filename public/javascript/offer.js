async function offerFormHandler(event) {
  event.preventDefault();

  const description = document
    .querySelector('textarea[name="trade-body"]')
    .value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (description) {
    const response = await fetch("/api/offers", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".offer-form")
  .addEventListener("submit", offerFormHandler);
