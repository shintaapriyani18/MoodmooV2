import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const pathname = req.nextUrl.pathname;

    // Redirect rules untuk guest (non-authenticated)
    if (!token) {
      // Block access to cart and product management
      if (
        pathname.startsWith('/cart') ||
        pathname.startsWith('/product/add') ||
        pathname.startsWith('/product/edit') ||
        pathname.startsWith('/product/delete')
      ) {
        const callbackUrl = encodeURIComponent(pathname);
        return NextResponse.redirect(
          new URL(`/auth/signin?callbackUrl=${callbackUrl}`, req.url)
        );
      }
      return NextResponse.next();
    }

    // Role-based access control
    const { role } = token;
    
    // Admin-only routes
    const adminRoutes = [
      '/product/add',
      '/product/edit',
      '/product/delete'
    ];
    
    if (adminRoutes.some(route => pathname.startsWith(route)) && role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {  // Tambahkan req di parameter
        // Untuk path yang tidak perlu auth, biarkan lewat
        const publicPaths = ['/product', '/product/detail'];
        const isPublic = publicPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        );
        
        return isPublic ? true : !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/cart',
    '/cart/:path*',
    '/product/add',
    '/product/edit/:path*',
    '/product/delete/:path*',
    '/product/:path*'
  ],
};