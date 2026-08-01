/** @type {import('tailwindcss').Config} */
/* Tailwind v3. Every utility points at a SEMANTIC token, so class names
   read as roles (bg-primary, text-ink-muted) — never raw colors. */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover:   'var(--color-primary-hover)',
          subtle:  'var(--color-primary-subtle)',
        },
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
        },
        ink: {
          DEFAULT:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong:  'var(--border-strong)',
        },
        success: { DEFAULT: 'var(--success)', bg: 'var(--success-bg)', fg: 'var(--success-fg)' },
        warning: { DEFAULT: 'var(--warning)', bg: 'var(--warning-bg)', fg: 'var(--warning-fg)' },
        danger:  { DEFAULT: 'var(--danger)',  bg: 'var(--danger-bg)',  fg: 'var(--danger-fg)'  },
        info:    { DEFAULT: 'var(--info)',    bg: 'var(--info-bg)',    fg: 'var(--info-fg)'    },
      },
      fontFamily: {
        display: ['Gabarito', 'system-ui', 'sans-serif'],
        body:    ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"Azeret Mono"', 'ui-monospace', 'monospace'],
        accent:  ['Fredoka', 'Gabarito', 'sans-serif'],
      },
      boxShadow: {
        popover: 'var(--shadow-popover)',
        modal: 'var(--shadow-modal)',
      },
      borderRadius: {
        control: '6px',
        input:   '8px',
        card:    '12px',
        pill:    '7px',
      },
    },
  },
  plugins: [],
};
