import { DOMParser as XmldomParser } from '@xmldom/xmldom'
import type { PathConfig } from './PathZoneObject'

const domParser = new XmldomParser()

// Преобразуем <polygon points="x1,y1 x2,y2 ..."> в path d="M x1,y1 L x2,y2 ... Z"
function polygonPointsToPathD(pointsAttr: string): string {
    const points = pointsAttr
        .trim()
        .split(/\s+/)
        .map(p => p.split(',').map(Number))
        .filter(([x, y]) => !Number.isNaN(x) && !Number.isNaN(y))

    if (points.length === 0) return ''

    const [firstX, firstY] = points[0]
    const commands = [`M ${firstX},${firstY}`]

    for (let i = 1; i < points.length; i++) {
        const [x, y] = points[i]
        commands.push(`L ${x},${y}`)
    }

    commands.push('Z')
    return commands.join(' ')
}

export function parseSvgToPathConfigs(svgSource: string): PathConfig[] {
    const doc = domParser.parseFromString(svgSource, 'image/svg+xml')
    const paths: PathConfig[] = []

    const pathNodes = Array.from(doc.getElementsByTagName('path'))
    for (const node of pathNodes) {
        const d = node.getAttribute('d') || ''
        if (!d.trim()) continue
        const fill = getFillFromNode(node)
        paths.push({ d, fill })
    }

    const polyNodes = Array.from(doc.getElementsByTagName('polygon'))
    for (const node of polyNodes) {
        const points = node.getAttribute('points') || ''
        const d = polygonPointsToPathD(points)
        if (!d.trim()) continue
        const fill = node.getAttribute('fill') || undefined
        paths.push({ d, fill })
    }

    return paths
}



function getFillFromNode(node: Element): string | undefined {
    let fill = node.getAttribute('fill')
    if (fill && fill !== 'none') {
        return fill
    }

    const style = node.getAttribute('style')
    if (style) {
        const m = style.match(/fill\s*:\s*([^;]+)/i)
        if (m) {
            const value = m[1].trim()
            if (value && value.toLowerCase() !== 'none') {
                return value
            }
        }
    }

    return undefined
}