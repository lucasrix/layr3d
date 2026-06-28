import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'] });

export const metadata = {
  title: 'layr3d — Custom 3D Printing',
  description: 'Turn any STL file into a custom 3D print. Upload your file, choose your material and size, and we handle the rest.',
  keywords: ['3D printing', 'custom prints', 'STL', 'PLA', 'PETG', 'TPU', 'layr3d'],
  openGraph: {
    title: 'layr3d — Custom 3D Printing',
    description: 'Turn any STL file into a custom 3D print.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
