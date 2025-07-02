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
