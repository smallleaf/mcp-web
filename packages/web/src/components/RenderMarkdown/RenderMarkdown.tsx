import { useThemeStore } from '@/store/theme'
import { Typography } from 'antd'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import CodeBlock from './CodeBlock'
import style from './style.module.scss'
import { useEffect, useState } from 'react'

export interface RenderMarkdownProps {
  content: string
}

export default function RenderMarkdown({ content }: RenderMarkdownProps) {
  const _theme = useThemeStore(state => state.theme)
  const [goodsImages, setGoodsImages] = useState<string[]>([])
  const theme = _theme === 'default' ? 'light' : 'dark'

  useEffect(() => {
    // 解析所有goods代码块中的图片
    const goodsMatches = content.matchAll(/```goods([\s\S]*?)```/g)
    const images: string[] = []
    for (const match of goodsMatches) {
      try {
        const goodsData = JSON.parse(match[1].trim())
        if (goodsData.pic) {
          images.push(goodsData.pic)
        }
      } catch (error) {
        console.error('Failed to parse goods data:', error)
      }
    }
    setGoodsImages(images)
  }, [content])

  return (
    <>
      <Typography className={style['markdown-typography']}>
        <ReactMarkdown
          remarkPlugins={[
            () => (tree) => {
              visit(tree, 'code', (node) => {
                node.lang = node.lang ?? 'plaintext'
              })
            },
            remarkGfm,
          ]}
          components={{
            code: (props) => {
              const { children, className } = props
              const language = className ? className.replace('language-', '') : 'txt'

              return className
                ? (
                    <CodeBlock language={language} theme={theme}>
                      {children}
                    </CodeBlock>
                  )
                : (
                    <code>
                      {children}
                    </code>
                  )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Typography>
      {goodsImages.length > 0 && (
        <div style={{ marginTop: 20, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {goodsImages.map((image, index) => (
            <img key={index} src={image} alt={`商品图片 ${index + 1}`} style={{ maxWidth: '30%' }} />
          ))}
        </div>
      )}
    </>
  )
}
