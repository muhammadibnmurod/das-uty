export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('access_token')
  const authPaths = ['/auth']
  const requiresAuth = to.meta.requiresAuth === true

  if (!token.value && requiresAuth) {
    return navigateTo('/auth')
  }

  if (token.value && authPaths.includes(to.path)) {
    return navigateTo('/example')
  }
})
