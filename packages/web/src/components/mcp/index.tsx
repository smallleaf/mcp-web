import changelog from '@/../CHANGELOG.md?raw'
import RenderMarkdown from '@/components/RenderMarkdown'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useState } from 'react'
import SideButton from '../SideButton'


export function Mcp() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <SideButton icon={<InfoCircleOutlined className="w-4 h-4" />} onClick={() => setOpen(true)}>
        MCP
      </SideButton>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        onClose={() => {
          setOpen(false)
        }}
        title="已接入的MCP插件"
        footer={null}
      >
        <div className="h-[500px] overflow-y-auto">
          <div className="mt-4">
            <RenderMarkdown content={changelog} />
          </div>
        </div>
      </Modal>
    </>
  )
}
