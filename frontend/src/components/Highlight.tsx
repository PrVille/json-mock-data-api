type HighlightProps = {
  children: React.ReactNode
}

const Highlight = ({ children }: HighlightProps) => {
  return (
    <span className="text-xs px-1 py-0.5 bg-gray-100 rounded-md whitespace-nowrap">
      {children}
    </span>
  )
}

export default Highlight
