import { Link } from "react-router-dom"

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-base">{children}</p>
}

const Parameters = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const ParametersTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="py-3 border-b font-medium">{children}</h1>
}

const ParametersList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="divide-y">{children}</ul>
}

const ParametersListItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="py-4">{children}</li>
}

type ParametersListItemLabelProps = {
  name: string
  type: string
  url?: string
}

const ParametersListItemLabel = ({
  name,
  type,
  url,
}: ParametersListItemLabelProps) => {
  return (
    <h3 className="flex text-xs">
      <span className="font-semibold text-gray-700 text-[13px] mr-1">
        {name}
      </span>
      <span className="text-gray-500 font-semibold mr-1">{type}</span>
      {url !== undefined && (
        <Link
          to={url}
          className="uppercase text-[10px] tracking-widest font-semibold mr-1 text-sky-500 border-b border-gray-200 border-dashed"
        >
          {name}
        </Link>
      )}
    </h3>
  )
}

const ParametersListItemDescription = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <p className="text-sm mt-1.5 text-gray-600">{children}</p>
}

Content.Description = Description

Content.Parameters = Parameters
Parameters.Title = ParametersTitle
Parameters.List = ParametersList
Parameters.ListItem = ParametersListItem
Parameters.ListItemLabel = ParametersListItemLabel
Parameters.ListItemDescription = ParametersListItemDescription

export default Content
