export const useFixBody = () => {
  const fixBody = () => {
    document.body.style.overflow = 'hidden'
  }
  const unfixedBody = () => {
    document.body.style.overflow = 'unset'
  }
  return { fixBody, unfixedBody }
}
