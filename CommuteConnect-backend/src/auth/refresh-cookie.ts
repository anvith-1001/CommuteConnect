export function refreshCookieOptions(production: boolean) {
  return {
    httpOnly: true,
    secure: production,
    sameSite: 'lax' as const,
    path: '/api/auth',
    maxAge: 7 * 86400000,
  };
}