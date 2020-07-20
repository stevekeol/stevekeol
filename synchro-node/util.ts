/**
 * 生成五位随机数字(用于弥补taskId的精度不足)
 * @return { number }
 */
export function random() {
  return Math.round(Math.random() * (99999 - 10000)) + 10000;
}