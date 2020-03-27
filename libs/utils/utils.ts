export async function safeWait<T>(fn: Promise<T>): Promise<T | void> {
  try {
    const result = await fn
    return result
  } catch (err) {
    console.log(err)
    return undefined
  }
}
