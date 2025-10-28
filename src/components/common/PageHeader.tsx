import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

/**
 * PageHeader component provides consistent page title and description layout
 */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl text-white mb-2">{title}</h1>
        <p className="text-white/60">{description}</p>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
