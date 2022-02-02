// This could be any type of error message
// Probably use a different type to enable localization
// But for this, I will just use strings
export type ErrorMessage = string | null

export type ResultDataError<T, U> = {
  data: T
  error: U
}