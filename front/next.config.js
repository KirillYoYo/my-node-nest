// для antD (он используте модули)
const withTM = require('next-transpile-modules')([
    'antd',
    '@ant-design/icons',
    'rc-pagination',
    'rc-util',
    'rc-picker',
    'rc-overflow',
    'rc-resize-observer',
    'rc-motion',
])

module.exports = withTM({
    reactStrictMode: true,
    swcMinify: true,
})
