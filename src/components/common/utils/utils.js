// 防抖操作，给服务器减轻压力
export function debounce(func, delay) {
  // 创建一个空的定时器
  let timer = null
  return function (...args) {
    // 当定时器有值时，清空定时器
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}