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
