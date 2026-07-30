import fs from 'fs'
import { siteConfig } from '@/lib/config'

export function generateRobotsTxt(props) {
  const { siteInfo, NOTION_CONFIG } = props
  const LINK = siteInfo?.link
  const allowIndex = siteConfig('SEO_ALLOW_INDEX', false, NOTION_CONFIG)

  const content = allowIndex
    ? `
    # *
    User-agent: *
    Allow: /

    # Host
    Host: ${LINK}

    # Sitemaps
    Sitemap: ${LINK}/sitemap.xml

    `
    : `
    # *
    User-agent: *
    Disallow: /

    # Host
    Host: ${LINK}

    `
  try {
    fs.mkdirSync('./public', { recursive: true })
    fs.writeFileSync('./public/robots.txt', content)
  } catch (error) {
    // 在vercel运行环境是只读的，这里会报错；
    // 但在vercel编译阶段、或VPS等其他平台这行代码会成功执行
  }
}
