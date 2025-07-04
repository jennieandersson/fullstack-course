export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    console.log('Form submitted via api route:', { name, email })
    return new Response(null, { status: 204 })
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : 'Unexpected error'

    return new Response(message, { status: 500 })
  }
}
