export const isValidEmail = (email: string): boolean => {
  const regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/
  return regex.test(email)
}

export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789)'
  return [...Array(length)].map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('')
}
