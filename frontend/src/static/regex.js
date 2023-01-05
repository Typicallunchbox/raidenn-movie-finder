export const validYear = /^(19|20)\d{2}$/
export const validEmail = /^[a-zA-Z0-9][a-zA-Z0-9-_\.\+]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/
export const validPasswordStrength = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{7}$/

export const validUserName = /^[A-Za-z0-9_]{4,25}$/
export const minSixCharsNoSpec = /^[\s-]*(?:\d[\s-]*){4}$/