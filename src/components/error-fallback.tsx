import { FallbackProps } from "react-error-boundary"

import { config, translate } from "store/index"

type FCT = React.FC<FallbackProps>

const ErrorFallback: FCT = ({ error }) => {
  const { message, stack } = error instanceof Error ? error : new Error(error)

  return (
    <div className="error-fallback" role="alert">
      <p>
        {translate(
          "Sorry, we appear to be having issues loading the application data. If the problem persists, please contact support.",
        )}
      </p>

      <pre className="error">{message}</pre>

      <a
        href={`mailto:${config.supportEmail}?subject=Web Wallet Problem: ${message}&body=%0D%0A%0D%0A%0D%0AProblem details: %0D%0A%0D%0A${stack}`}
      >
        {translate("Email Support")}
      </a>
      <div className="separator">|</div>
      <a href="/">{translate("Reload Application")}</a>
    </div>
  )
}

export default ErrorFallback
