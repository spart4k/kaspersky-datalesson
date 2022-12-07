const TIMER = process.env.NODE_ENV === 'production' ? 2000 : 100

export const pushPopup = (arr, messages) => new Promise((resolve) => {
  arr.forEach((item, index) => {
    setTimeout(() => messages.push(item), index * TIMER)
  })
  setTimeout(() => resolve(), (arr.length - 1) * TIMER)
})
