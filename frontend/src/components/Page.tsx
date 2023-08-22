const Page = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-gray-800 max-w-screen-2xl mx-auto">{children}</div>
  )
}

const Section = ({ children }: { children: React.ReactNode }) => {
  return <section className="p-16">{children}</section>
}

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="font-medium text-2xl">{children}</h1>
}

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-5 flex flex-col justify-between md:flex-row gap-12">
      {children}
    </div>
  )
}

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 max-w-[600px]">{children}</div>
}

const Examples = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 max-w-[600px] space-y-3">{children}</div>
}

const Divider = () => <div className="border-t mx-16" />

Page.Section = Section
Section.Title = Title
Section.Body = Body
Section.Content = Content
Section.Examples = Examples

Page.Divider = Divider

export default Page
