const Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="mb-6 text-base text-gray-600">{children}</p>
}

const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-sm mt-1.5 mb-4 text-gray-600">{children}</p>
}

const Parameters = ({ children }: { children: React.ReactNode }) => {
  return <div className="">{children}</div>
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
  type?: string
  required?: boolean
  optional?: boolean
}

const ParametersListItemLabel = ({
  name,
  type,
  required = false,
  optional = false
}: ParametersListItemLabelProps) => {
  return (
    <h3 className="flex text-xs">
      <span className="font-semibold text-gray-700 text-[13px] mr-1">
        {name}
      </span>
      {type !== undefined && <span className="text-gray-500 font-semibold mr-1">{type}</span>}
      {required && (
        <span
          className="text-[10px] uppercase font-semibold mr-1 text-orange-500"
        >
          required
        </span>
      )}
       {optional && (
        <span
          className="text-[10px] uppercase font-semibold mr-1 text-gray-500"
        >
          optional
        </span>
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
Content.Subtitle = Subtitle
Content.Parameters = Parameters
Parameters.Title = ParametersTitle
Parameters.List = ParametersList
Parameters.ListItem = ParametersListItem
Parameters.ListItemLabel = ParametersListItemLabel
Parameters.ListItemDescription = ParametersListItemDescription

export default Content
