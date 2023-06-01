/* eslint-disable */
export const validYear = /^(19|20)\d{2}$/
export const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const validPasswordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/

export const validUserName = /^[A-Za-z0-9_]{4,25}$/
export const minSixCharsNoSpec = /^[\s-]*(?:\d[\s-]*){4}$/