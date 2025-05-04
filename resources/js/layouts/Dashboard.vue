<template>
  <div class="flex h-screen bg-gray-200">
    <div
      :class="sidebarOpen ? 'block' : 'hidden'"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>

    <div
      :class="
        sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
      "
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center flex-col justify-center my-8">
        <p
          class="px-2 py-1 rounded text-white font-semibold text-2xl uppercase flex flex-col items-center"
        >
          bumi kahuripan

          <span
            class="text-indigo-500 tracking-wider text-sm font-normal capitalize"
          >
            point of sales app
          </span>
        </p>
      </div>

      <nav>
        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100',
            $route.path === '/dashboard'
              ? 'text-white bg-gray-700 bg-opacity-25'
              : ''
          ]"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            ></path>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/dashboard" class="m-0">dashboard</RouterLink>
          </span>
        </div>

        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100',
            $route.path.includes('orders')
              ? 'text-white bg-gray-700 bg-opacity-25'
              : ''
          ]"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            ></path>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/orders" class="m-0">tamu</RouterLink>
          </span>
        </div>

        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100',
            $route.path.includes('rooms')
              ? 'text-white bg-gray-700 bg-opacity-25'
              : ''
          ]"
          v-if="user && user.role.name === 'Super Admin'"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            ></path>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/rooms" class="m-0">kamar</RouterLink>
          </span>
        </div>

        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100',
            $route.path === '/settings'
              ? 'text-white bg-gray-700 bg-opacity-25'
              : ''
          ]"
          v-if="user && user.role.name === 'Super Admin'"
        >
          <svg
            class="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            ></path>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/settings" class="m-0">pengaturan</RouterLink>
          </span>
        </div>
      </nav>
    </div>

    <div class="flex flex-col flex-1 overflow-hidden">
      <header
        class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
      >
        <button
          @click="sidebarOpen = true"
          class="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>

        <div
          class="flex items-center lg:gap-0 gap-4 lg:justify-between justify-end w-full sm:ms-0 ms-2"
          v-if="user.name"
        >
          <p class="capitalize">
            selamat datang,
            <span class="font-semibold"> {{ user.name }}! </span>
          </p>

          <button
            class="outline outline-red-500 uppercase px-3 py-1 rounded-lg text-red-500 font-semibold"
            @click="logout"
          >
            keluar
          </button>
        </div>
      </header>

      <RouterView :current-path="currentPath" />
    </div>
  </div>
</template>

<script>
import { getMe, logout } from '../apis/auth'

export default {
  data() {
    return {
      sidebarOpen: false,
      user: ''
    }
  },
  mounted() {
    this.getProfile()
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    async getProfile() {
      const res = await getMe()

      this.user = res.data.user
    },
    async logout() {
      try {
        const res = await logout()

        if (res.status === 200) {
          alert('Logout berhasil.')
          localStorage.removeItem('auth-token')
          this.$router.push('/login')
        }
      } catch (err) {
        console.error(err.response.data)
      }
    }
  }
}
</script>
