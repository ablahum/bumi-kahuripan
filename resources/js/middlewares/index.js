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

      const isRestricted = to.matched.some(
        (record) =>
          record.meta.requiresRole &&
          record.meta.requiresRole !== user.role.name
      )

      if (isRestricted) {
        return user.role.name === 'Super Admin'
          ? next({ path: '/dashboard' })
          : next({ path: '/orders' })
      }

      return next()
    } catch (err) {
      console.error('Auth guard error:', err)
      return next({ path: '/login' })
    }
  } else if (to.matched.some((record) => record.meta.requiresUser)) {
    if (token) {
      try {
        const res = await getMe()
        const user = res.data.user
        return user.role.name === 'Super Admin'
          ? next({ path: '/dashboard' })
          : next({ path: '/orders' })
      } catch (err) {
        console.error('Token ada tapi getMe error:', err)
        return next({ path: '/login' })
      }
    }

    return next()
  }

  next()
}
