export function gtag_report_conversion(url?: string): boolean {
  const callback = function () {
    if (url !== undefined) {
      window.location.href = url // window.location.href 사용
    }
  }
  gtag('event', 'conversion', {
    send_to: 'AW-16560768564/tfARCJWNyrgZELSM5dg9',
    event_callback: callback,
  })
  return false
}
