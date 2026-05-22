import { cn } from '@/lib/utils'

interface TeamCardProps {
  name: string
  role: string
  specialization?: string
  avatar?: string
  className?: string
}

export function TeamCard({ name, role, specialization, avatar, className }: TeamCardProps) {
  const initials = name.startsWith('@') ? name.slice(1, 3).toUpperCase() : name.slice(0, 2).toUpperCase()

  return (
    <div className={cn('group relative', className)}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="relative w-20 h-20 rounded-full border-2 border-border group-hover:border-accent/40 transition-all duration-500 object-cover"
            />
          ) : (
            <div className="relative w-20 h-20 rounded-full border-2 border-border group-hover:border-accent/40 transition-all duration-500 bg-accent/10 flex items-center justify-center">
              <span className="text-xl font-black text-accent-darker">{initials}</span>
            </div>
          )}
        </div>
        <div>
          <p className="font-black text-foreground group-hover:text-accent transition-colors">{name}</p>
          <p className="text-sm font-bold text-muted-foreground mt-1">{role}</p>
          {specialization && (
            <p className="text-xs text-muted-foreground/60 mt-1 font-light">{specialization}</p>
          )}
        </div>
      </div>
    </div>
  )
}
