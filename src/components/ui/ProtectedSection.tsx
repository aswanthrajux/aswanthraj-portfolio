import { useState, type ReactNode } from 'react'
import { Lock, Unlock } from 'lucide-react'

// Simple hash function (not security-critical — just hides casual readers)
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

// Password: "glance2025" → change this to your preferred password
const PASSWORD_HASH = simpleHash('glance2025')

interface ProtectedSectionProps {
  children: ReactNode
}

export function ProtectedSection({ children }: ProtectedSectionProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = () => {
    if (simpleHash(input) === PASSWORD_HASH) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setInput('')
    }
  }

  if (unlocked) {
    return (
      <div
        style={{
          borderLeft: '3px solid var(--color-border)',
          paddingLeft: '1.5rem',
          margin: '2rem 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <Unlock size={14} style={{ color: 'var(--color-muted)' }} />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Confidential — Unlocked
          </span>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '1rem',
        padding: '2.5rem',
        textAlign: 'center',
        margin: '2rem 0',
        backgroundColor: 'var(--color-subtle)',
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
      `}</style>
      <Lock
        size={22}
        style={{ color: 'var(--color-muted)', marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }}
      />
      <p
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          color: 'var(--color-text)',
          margin: '0 0 0.375rem',
        }}
      >
        Confidential Section
      </p>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          color: 'var(--color-muted)',
          margin: '0 0 1.5rem',
        }}
      >
        This section contains confidential metrics. Enter the password to reveal.
      </p>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Enter password"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9375rem',
            padding: '0.625rem 1rem',
            border: `1.5px solid ${error ? '#ef4444' : 'var(--color-border)'}`,
            borderRadius: '100px',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            outline: 'none',
            width: '200px',
            transition: 'border-color 0.2s ease',
          }}
        />
        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ paddingTop: '0.625rem', paddingBottom: '0.625rem' }}
        >
          Unlock
        </button>
      </div>
      {error && (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: '#ef4444',
            marginTop: '0.625rem',
          }}
        >
          Incorrect password. Try again.
        </p>
      )}
    </div>
  )
}
