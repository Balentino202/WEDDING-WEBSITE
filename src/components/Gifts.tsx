import { useState } from 'react'
import { gifts } from '../data/wedding'
import './Gifts.css'

export default function Gifts() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <section id="gifts" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="script">With Gratitude</span>
          <h2>Gifts &amp; Blessings</h2>
          <p className="sub">{gifts.intro}</p>
          <div className="divider">
            <span>❦</span>
          </div>
        </div>

        <div className="gifts__grid">
          {gifts.accounts.map((acc) => (
            <article className="gift-card reveal" key={acc.accountNumber}>
              <div className="gift-card__bank">
                {acc.bank}
                {acc.currency && <span className="gift-card__currency">{acc.currency}</span>}
              </div>
              <div className="gift-card__row">
                <span className="gift-card__label">Account Name</span>
                <span className="gift-card__value">{acc.accountName}</span>
              </div>
              <div className="gift-card__row">
                <span className="gift-card__label">Account Number</span>
                <span className="gift-card__value gift-card__number">{acc.accountNumber}</span>
              </div>
              {acc.swiftCode && (
                <div className="gift-card__row">
                  <span className="gift-card__label">Swift Code</span>
                  <span className="gift-card__value">{acc.swiftCode}</span>
                </div>
              )}
              {acc.sortCode && (
                <div className="gift-card__row">
                  <span className="gift-card__label">Sort Code</span>
                  <span className="gift-card__value">{acc.sortCode}</span>
                </div>
              )}
              <button className="btn btn--ghost gift-card__copy" onClick={() => copy(acc.accountNumber)}>
                {copied === acc.accountNumber ? '✓ Copied' : 'Copy Number'}
              </button>
            </article>
          ))}
        </div>

        <p className="gifts__phone reveal">
          To arrange a physical gift, please call&nbsp;
          <a href={`tel:${gifts.phone}`}>{gifts.phone}</a>
        </p>
      </div>
    </section>
  )
}
