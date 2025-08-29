export default function useAuth() {
  const accessToken = useCookie('access_token');
  const refreshToken = useCookie('refresh_token');

  // Получение текущего access token
  function getAccessToken(): string | null {
    return accessToken.value || null;
  }

  // Обновление access token
  async function refreshAccessToken(): Promise<boolean> {
    if (!refreshToken.value) {
      return false;
    }

    try {
      if (accessToken.value && refreshToken.value) {
        const body = {
          refresh_token: refreshToken.value as string,
          token: accessToken.value as string,
        }
        const { data, error } = await useApiService().Auth.refresh_token(body)
        if (error.value || !data.value) {
          // Очищаем токены при неудачном обновлении
          clearTokens()
          return false;
        }
        // Обновляем токены
        accessToken.value = (data.value as { access_token: string; refresh_token?: string }).access_token;
        if ((data.value as { refresh_token?: string }).refresh_token) {
          refreshToken.value = (data.value as { refresh_token: string }).refresh_token;
        }
        return true;
      } else {
        // Очищаем токены
        clearTokens()
        return false;
      }
    } catch {
      clearTokens()
      return false;
    }
  }

  function clearTokens() {
    useCookie('access_token', { maxAge: -1 }).value = ''
    useCookie('refresh_token', { maxAge: -1 }).value = ''
  }

  return {
    getAccessToken,
    refreshAccessToken,
  };
}