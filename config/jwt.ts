export default {
  secret: process.env.JWT_SECRET || 'super_secret_key_change_this',
  accessTokenExpiry: '15m',
  issuer: 'energy-management-system',
}
