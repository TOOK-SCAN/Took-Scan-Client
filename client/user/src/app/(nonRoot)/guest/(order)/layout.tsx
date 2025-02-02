import type { LayoutProps } from '@/types/common'
import { Banner } from '@tookscan/components'

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <Banner type={1} />
      {children}
    </div>
  )
}
