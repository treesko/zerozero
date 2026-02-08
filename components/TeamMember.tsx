import Image from 'next/image'
import { cn } from '@/lib/cn'

type TeamMemberProps = {
  name: string
  role: string
  bio: string
  image?: string
  credentials?: string[]
  linkedin?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function TeamMember({ name, role, bio, image, credentials, linkedin }: TeamMemberProps) {
  return (
    <div className="reveal group rounded-xl border border-primary-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-primary-800 dark:bg-primary-900">
      {/* Avatar */}
      <div className="mb-4 flex justify-center">
        {image ? (
          <div className="relative h-32 w-32 overflow-hidden rounded-full shadow-md transition-transform group-hover:scale-105">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent text-2xl font-bold text-white shadow-md transition-transform group-hover:scale-105">
            {getInitials(name)}
          </div>
        )}
      </div>

      {/* Name and role */}
      <div className="mb-3 text-center">
        <h3 className="text-lg font-bold text-primary dark:text-white">{name}</h3>
        <p className="text-sm font-medium text-accent">{role}</p>
      </div>

      {/* Bio */}
      <p className="mb-4 text-center text-sm text-primary-600 dark:text-primary-300 leading-relaxed">{bio}</p>

      {/* Credentials */}
      {credentials && credentials.length > 0 && (
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {credentials.map((cred, index) => (
            <span
              key={index}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-800 dark:text-primary-200"
            >
              {cred}
            </span>
          ))}
        </div>
      )}

      {/* LinkedIn link */}
      {linkedin && (
        <div className="flex justify-center">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition-colors hover:text-accent dark:text-primary-300 dark:hover:text-accent"
            aria-label={`${name} on LinkedIn`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4 0 4.7 2.6 4.7 6v8h-4v-7.1c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.8-2.8 3.8V24H8z" />
            </svg>
            LinkedIn
          </a>
        </div>
      )}
    </div>
  )
}
