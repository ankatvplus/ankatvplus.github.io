addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    const url = new URL(request.url)
    const target = url.searchParams.get("ID")
    if (!target) {
      return new Response("ID query param is required", { status: 400 })
    }

    // Ensure full URL
    if (!target.startsWith("http")) {
      return new Response("Invalid full target URL", { status: 400 })
    }

    const response = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    })

    // Response headers (isteğe bağlıda filtreleyebilirsin)
    const newHeaders = new Headers(response.headers)
    newHeaders.set("Access-Control-Allow-Origin", "*")

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    })
  } catch (err) {
    return new Response(err.toString(), { status: 500 })
  }
}
