import { Link } from "react-router-dom"
import { Method } from "../typings/enums"
import { methodColorMap, methodColorMapLight } from "../constants"
import SyntaxHighlighter from "react-syntax-highlighter"
import {
  a11yDark,
  stackoverflowLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs"
import { classNames } from "../utils"
import { ClipboardIcon } from "@heroicons/react/24/outline"

const ExampleResponse = ({
  children,
  darkMode,
}: {
  children: React.ReactNode
  darkMode?: boolean
}) => {
  return (
    <div
      className={classNames(
        "rounded-lg border",
        darkMode ? "bg-gray-600" : "bg-gray-50"
      )}
    >
      {children}
    </div>
  )
}

const TopBar = ({
  children,
  darkMode = false,
}: {
  children: React.ReactNode
  darkMode?: boolean
}) => {
  return (
    <header
      className={classNames(
        "px-3 py-2.5 tracking-[0.01em] flex w-full items-center justify-between rounded-t-lg",
        darkMode ? "bg-gray-700" : "bg-gray-100"
      )}
    >
      {children}
    </header>
  )
}

const TopBarTitle = ({
  children,
  darkMode = false,
}: {
  children: React.ReactNode
  darkMode?: boolean
}) => {
  return (
    <h1
      className={classNames(
        "text-xs font-medium uppercase select-none pointer-events-none",
        darkMode ? "text-gray-300" : "text-gray-500"
      )}
    >
      {children}
    </h1>
  )
}

type EndpointTitleProps = {
  method: Method
  endpoint: string
}

const TopBarEndpointTitle = ({ method, endpoint }: EndpointTitleProps) => {
  return (
    <h1 className="flex items-center gap-2 text-xs font-medium font-mono select-none pointer-events-none text-gray-300">
      <span className={methodColorMapLight[method]}>{method}</span>
      <span>{endpoint}</span>
    </h1>
  )
}

const CopyButton = ({
  darkMode = false,
  onClick,
}: {
  darkMode?: boolean
  onClick: () => void
}) => {
  return (
    <button onClick={onClick}>
      <ClipboardIcon
        className={classNames(
          "h-4 w-4",
          darkMode ? "text-gray-300" : "text-gray-500"
        )}
      />
    </button>
  )
}

const Endpoints = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-5 py-3 flex flex-col text-[13px]/[22px] font-medium font-mono max-h-[75vh] overflow-auto">
      {children}
    </div>
  )
}

type EndpointProps = {
  method: Method
  endpoint: string
  url: string
}

// Add on hover text
const Endpoint = ({ method, endpoint, url }: EndpointProps) => {
  return (
    <Link to={url} className="flex items-center gap-2">
      <div className="w-[45px] text-right">
        <span className={methodColorMap[method]}>{method}</span>
      </div>
      <span className="text-gray-500">{endpoint}</span>
    </Link>
  )
}

const Schema = ({ schema }: { schema: string }) => {
  return (
    <div className="p-3 text-[13px]/[19px] font-mono max-h-[50vh] overflow-auto">
      <SyntaxHighlighter
        language="properties"
        customStyle={{
          backgroundColor: "inherit",
          padding: 0,
          overflow: "unset",
        }}
        style={stackoverflowLight}
      >
        {schema}
      </SyntaxHighlighter>
    </div>
  )
}

const Json = ({
  object,
  className = "",
}: {
  object: object
  className?: string
}) => {
  return (
    <div
      className={classNames(
        "relative p-3 text-[13px]/[19px] font-mono max-h-[50vh] overflow-auto",
        className
      )}
    >
      <SyntaxHighlighter
        language="json"
        customStyle={{
          backgroundColor: "inherit",
          padding: 0,
          overflow: "unset",
        }}
        style={stackoverflowLight}
      >
        {JSON.stringify(object, null, 2)}
      </SyntaxHighlighter>
    </div>
  )
}

const Javascript = ({
  codeBlock,
  className = "",
}: {
  codeBlock: string
  className?: string
}) => {
  return (
    <div
      className={classNames(
        "relative p-3 text-[13px]/[19px] font-mono max-h-[50vh] overflow-auto",
        className
      )}
    >
      <SyntaxHighlighter
        language="javascript"
        style={a11yDark}
        customStyle={{
          backgroundColor: "inherit",
          padding: 0,
          overflow: "unset",
        }}
        showLineNumbers
      >
        {codeBlock}
      </SyntaxHighlighter>
    </div>
  )
}

ExampleResponse.TopBar = TopBar
TopBar.Title = TopBarTitle
TopBar.EndpointTitle = TopBarEndpointTitle
TopBar.CopyButton = CopyButton

ExampleResponse.Endpoints = Endpoints
Endpoints.Endpoint = Endpoint

ExampleResponse.Schema = Schema
ExampleResponse.Json = Json
ExampleResponse.Javascript = Javascript

export default ExampleResponse
