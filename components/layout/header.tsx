export function Header() {
  return (
    <header className="bg-[#00664f] border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="white"
                 className="lucide lucide-sticker-icon lucide-sticker">
                <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/>
                <path d="M14 3v4a2 2 0 0 0 2 2h4"/>
                <path d="M8 13h.01"/>
                <path d="M16 13h.01"/>
                <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1"/>
            </svg>
            <div className="h-6 w-px bg-primary-foreground/30"/>
            <h1 className="text-lg font-semibold text-primary-foreground">Apprenticeship Data Management System</h1>
        </div>
      </div>
    </header>
  )
}
