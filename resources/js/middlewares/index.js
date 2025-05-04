import { getMe } from '../apis/auth'

export const authMiddleware = async (to, from, next) => {
  const token = localStorage.getItem('auth-token')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      return next({ path: '/login' })
    }

    try {
      const res = await getMe()
      const user = res.data.user

      if (
        to.matched.some(
          (record) =>
            record.meta.requiresRole &&
            record.meta.requiresRole !== user.role.name
        )
      ) {
        return next({ path: '/dashboard' })
      }

      return next()
    } catch (err) {
      console.error('Auth guard error:', err)
      return next({ path: '/login' })
    }
  } else if (to.matched.some((record) => record.meta.requiresUser)) {
    if (token) {
      return next({ path: '/dashboard' })
    }

    return next()
  }

  next()
}
