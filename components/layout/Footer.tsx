import Link from "next/link";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div>
            <h3 className="font-bold text-heading tracking-wide uppercase text-xs mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-body">
              <li><Link href="/collections/all" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link href="/collections/automated-collection" className="hover:text-accent transition-colors">Snowboards</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Bindings</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Apparel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-heading tracking-wide uppercase text-xs mb-6">About</h3>
            <ul className="space-y-4 text-sm text-body">
              <li><Link href="#" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Technology</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-heading tracking-wide uppercase text-xs mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-body">
              <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Warranty</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-heading tracking-wide uppercase text-xs mb-6">Newsletter</h3>
            <p className="text-sm text-body mb-4">
              Subscribe for the latest news, products, and promotions.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-xs text-body">
            &copy; {new Date().getFullYear()} Headless Storefront, Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-body">
            <Link href="#" className="hover:text-heading">Privacy Policy</Link>
            <Link href="#" className="hover:text-heading">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}