import { translate, truncatedDisplay, useQuery } from "@galoymoney/client"
import { Icon, Spinner } from "@galoymoney/react"

import { history } from "../../store"
import { useAuthContext } from "../../store/use-auth-context"
import ErrorMessage from "../error-message"
import Header from "../header"

const ContactsList = () => {
  const { loading, errorsMessage, data } = useQuery.contacts()

  const handleSendBitcoin = (contactUsername: string) => {
    history.push(`/send?to=${contactUsername}`)
  }

  const showContactDetails = (contactUsername: string) => {
    history.push(`/transactions?username=${contactUsername}`)
  }

  return (
    <div className="list">
      {loading && <Spinner size="big" />}

      {errorsMessage && <ErrorMessage message={errorsMessage} />}

      {data?.me?.contacts.length === 0 && <div className="no-data">No Contacts</div>}

      {data?.me?.contacts.map((contact) => {
        return (
          <div key={contact.username} className="contact">
            <Icon name="person" />
            <div className="name" onClick={() => handleSendBitcoin(contact.username)}>
              {truncatedDisplay(contact.alias ?? contact.username)}
            </div>
            <div className="actions">
              <div
                title={translate("Transaction List")}
                onClick={() => showContactDetails(contact.username)}
              >
                <Icon name="list" />
              </div>
              <div
                title={translate("Send Bitcoin")}
                onClick={() => handleSendBitcoin(contact.username)}
              >
                <Icon name="send" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const Contacts = {} as LayoutComponent<Record<string, never>>

Contacts.Large = function Contacts() {
  const { isAuthenticated } = useAuthContext()

  return (
    <div className="contacts">
      <Header.Large page="contacts" />

      <div className="page-title">{translate("Contacts")}</div>
      {isAuthenticated ? <ContactsList /> : <div className="no-data">No Contacts</div>}
    </div>
  )
}

Contacts.Small = Contacts.Large

export default Contacts