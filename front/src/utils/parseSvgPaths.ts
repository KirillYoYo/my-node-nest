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

    const rootMatch = svgSource.match(/:root\s*{([^}]*)}/s)
    const declarations = rootMatch && rootMatch[1]

    const pathNodes = Array.from(doc.getElementsByTagName('path'))
    for (const node of pathNodes) {
        const d = node.getAttribute('d') || ''
        if (!d.trim()) continue
        const fill = getFillFromNode(node, parseDeclarationsString(declarations || ''))
        paths.push({ d, fill: fill?.value || fill, isDark: fill?.isDark, isLight: fill?.isLight })
    }

    const polyNodes = Array.from(doc.getElementsByTagName('polygon'))
    for (const node of polyNodes) {
        const points = node.getAttribute('points') || ''
        const d = polygonPointsToPathD(points)
        if (!d.trim()) continue
        const fill = getFillFromNode(node, parseDeclarationsString(declarations || '')) || undefined
        paths.push({ d, fill: fill?.value || fill, isDark: fill?.isDark, isLight: fill?.isLight })
    }

    return paths
}

function getFillFromNode(
    node: Element,
    declarations
): string | { value: string; isDark: boolean; isLight: boolean } | undefined {
    const fill = node.getAttribute('fill')
    if (fill && fill !== 'none') {
        return fill
    }

    const style = node.getAttribute('style')

    if (style && declarations.length !== 0) {
        const varMatch = style.match(/fill\s*:\s*var\((--[^)]+)\)/i)
        if (varMatch) {
            const varName = varMatch[1]
            const value = declarations[varName]

            if (value) {
                return {
                    value,
                    isDark: varName.includes('dark'),
                    isLight: varName.includes('light'),
                }
            }
        }
    }
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

function parseDeclarationsString(declarationsStr: string): Record<string, string> {
    const variables: Record<string, string> = {}

    const cleanStr = declarationsStr
        .replace(/\/\/.*$/gm, '') // убираем // комментарии
        .trim()

    const lines = cleanStr.split(';').filter(line => line.trim())

    lines.forEach(line => {
        const trimmed = line.trim()
        const colonIndex = trimmed.indexOf(':')

        if (colonIndex !== -1) {
            const key = trimmed.slice(0, colonIndex).trim()
            const value = trimmed.slice(colonIndex + 1).trim()

            if (key.startsWith('--') && value) {
                variables[key] = value
            }
        }
    })

    return variables
}
