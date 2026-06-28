export default function Footer() {
  return (
    <footer className="bg-brand-900 border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white mb-3">
              <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-bold text-lg">layr3d</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Custom 3D printing from your STL files. Handcrafted, quality-checked, and shipped to you.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12">
            <div>
              <div className="text-white text-sm font-semibold mb-3">Navigate</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#order" className="hover:text-white transition-colors">Place an Order</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-3">Materials</div>
              <ul className="space-y-2 text-sm">
                <li>PLA</li>
                <li>PETG</li>
                <li>TPU</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-600 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} layr3d. All rights reserved.</span>
          <span>Custom 3D Printing</span>
        </div>
      </div>
    </footer>
  );
}
