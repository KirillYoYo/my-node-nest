import { Point } from '../Login/types'

export const getEdges = (arr: Point[]) => {
    return arr.map((item, i) => {
        return {
            from: i as number,
            to: arr[i + 1] ? i + 1 : 0,
            type: 'straight' as const,
        }
    })
}

export function getRandomNumber(n: number, m: number): number {
    const min = Math.ceil(Math.min(n, m))
    const max = Math.floor(Math.max(n, m))
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function setToStorage<T>(key: string, value: T): void {
    try {
        const serialized = JSON.stringify(value)
        localStorage.setItem(key, serialized)
    } catch (error) {
        console.error(`Ошибка при сохранении в localStorage: ${key}`, error)
    }
}
export function getFromStorage<T>(key: string): T | null {
    try {
        const item = localStorage.getItem(key)
        return item ? (JSON.parse(item) as T) : null
    } catch (error) {
        console.error(`Ошибка при чтении из localStorage: ${key}`, error)
        return null
    }
}

export function removeFromStorage(key: string): void {
    localStorage.removeItem(key)
}
